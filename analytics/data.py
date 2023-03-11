from pprint import pprint

from sqlalchemy import create_engine, text
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

import locale
from analytics import utils

locale.setlocale(locale.LC_ALL, '')

engine = create_engine(
    "postgresql+psycopg2://postgres:password@localhost:5432/BSCS",
    # isolation_level="SERIALIZABLE",
)
connection = engine.connect()

M = 1000000


def extremitePeriode(univers, date, searche):
    request = f"""
        SELECT sum(montant) as "CA {date}" from public.base_dobb
        WHERE univers='{univers}' and date_facture = '{date}' 
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {searche};
    """
    return request


def extremiteYTD(univers, date, searche):
    date = datetime.strptime(date, "%Y-%m-%d")
    date_ytd = date - timedelta(days=365)
    date_ytd = datetime.strftime(date_ytd, "%Y-%m-%d")
    date = datetime.strftime(date, "%Y-%m-%d")

    request = f"""
        SELECT sum(montant) as "CA {date}" from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{date_ytd}' AND '{date}') 
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {searche};
    """
    return request


def getParcAtif(univers, get, debut_periode, fin_periode, searche):
    # Cette requête permet d'obtenir la somme du parc actif (ou le CA) par mois

    select_type = "count(id)"
    if get == 'ca':
        select_type = "sum(montant)"

    request = f"""
        SELECT date_facture as dates, {select_type} as parc_actif from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}')
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {searche}
        GROUP BY dates
        ORDER BY dates;
    """

    df = pd.read_sql(sql=text(request), con=connection)
    df["dates"] = pd.to_datetime(df["dates"], format='%Y-%m-%d', errors='ignore')
    df['dates'] = df['dates'].dt.strftime('%b-%y')
    df['dates'] = df['dates'].astype(str)

    # Convertir toutes les colonnes numériques en entier
    m = df.select_dtypes(np.number)
    df[m.columns] = m.round().astype(np.int64)

    # Nous les convertissons en liste pour echart
    date = df['dates'].tolist()
    values = df['parc_actif'].tolist()
    data = {'date': date, 'values': values}

    return data


def getCumule(liste_hausse, liste_baisse):
    stokes = [0]  # le premier élément
    for i in range(len(liste_hausse) - 1):
        # Le cumule doit commencer par zero et terminer par zero
        if i == len(liste_hausse) - 2:  # Le dernier élément
            stokes.append(0)
        else:
            # C2 = C1 + hausse1 ou C2 = C1 - baisse1
            if liste_hausse[i] > 0:
                if liste_hausse[i + 1] > 0:
                    val = stokes[i] + liste_hausse[i]
                    stokes.append(val)
                else:
                    val = (stokes[i] + liste_hausse[i]) - liste_baisse[i + 1]
                    stokes.append(val)
            else:
                val = stokes[i] - liste_baisse[i]
                stokes.append(val)

    return stokes


def getEvoPeriode(univers, debut_periode, fin_periode, evo_type, searche):
    # Réalisé dans la période par parc (statut)
    request = f"""
        SELECT 
            COALESCE(sum(case when (statut='Activation') then dif_montant end), 0) as "Activation",
            COALESCE(sum(case when (statut='Montée en valeur') then dif_montant end), 0) as "Montée en valeur",
            COALESCE(sum(case when (statut='Retour de suspension') then dif_montant end), 0) as "Retour de suspension",
            COALESCE(sum(case when (statut='Baisse en valeur') then dif_montant end), 0) as "Baisse en valeur",
            COALESCE(sum(case when (statut='Suspension') then dif_montant end), 0) as "Suspension"
            from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}') {searche};
    """

    # Détermine le CA de début et fin de période selon qu'il s'agisse de
    if evo_type == 'ytd':
        cumule_debut_periode = pd.read_sql(sql=text(extremiteYTD(univers, debut_periode, searche)), con=connection)
        cumule_fin_periode = pd.read_sql(sql=text(extremiteYTD(univers, fin_periode, searche)), con=connection)

    else:
        cumule_debut_periode = pd.read_sql(sql=text(extremitePeriode(univers, debut_periode, searche)), con=connection)
        cumule_fin_periode = pd.read_sql(sql=text(extremitePeriode(univers, fin_periode, searche)), con=connection)

    # Réalisé dans au cours de la période
    ca_periode_en_cours = pd.read_sql(sql=text(request), con=connection)

    ca_periode_en_cours = utils.formatDf(ca_periode_en_cours, ['axis', 'values'])
    cumule_debut_periode = utils.formatDf(cumule_debut_periode, ['axis', 'values'])
    cumule_fin_periode = utils.formatDf(cumule_fin_periode, ['axis', 'values'])

    df = pd.concat([cumule_debut_periode, ca_periode_en_cours], axis=0)
    df['cumsum'] = df['values'].cumsum(axis=0, skipna=False)

    data = pd.concat([df, cumule_fin_periode], axis=0).reset_index(drop=True)
    data.loc[data['axis'] == {fin_periode}, 'cumsum'] = data.loc[data['axis'] == {fin_periode}, 'values']
    data = utils.toInt(data=data)

    data['hausse'] = data['values'].apply(lambda x: x if x > 0 else 0)
    data['baisse'] = data['values'].apply(lambda x: -1 * x if x < 0 else 0)

    data.loc[data['axis'] == {debut_periode}, 'cumsum'] = 0
    data.loc[data['axis'] == {fin_periode}, 'cumsum'] = 0

    cumule = getCumule(data['hausse'].tolist(), data['baisse'].tolist())
    data['cumsum'] = cumule

    axis = data['axis'].tolist()
    val = data['cumsum'].tolist()
    hausse = data['hausse'].tolist()
    baisse = data['baisse'].tolist()
    data_final = {'axis': axis, 'val': val, 'hausse': hausse, 'baisse': baisse}

    return data_final


def getHausseBasse(univers, debut_periode, fin_periode, searche):

    request = f"""
        SELECT date_facture as dates,
            sum(case when (statut in ('Activation', 'Montée en valeur', 'Retour de suspension')) then dif_montant else NULL end) as hausse,
            sum(case when (statut in ('Baisse en valeur', 'Suspension')) then dif_montant else NULL end) as baisse
            from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}') {searche}
        group by dates
        order by dates;
    """

    ca_debut_periode = pd.read_sql(sql=text(extremitePeriode(univers, debut_periode, searche)), con=connection)
    evo_periode = pd.read_sql(sql=text(request), con=connection)
    evo_periode["dates"] = pd.to_datetime(evo_periode["dates"], format='%Y-%m-%d', errors='ignore')
    evo_periode['dates'] = evo_periode['dates'].dt.strftime('%b-%y')
    evo_periode['dates'] = evo_periode['dates'].astype(str)
    ca_fin_periode = pd.read_sql(sql=text(extremitePeriode(univers, fin_periode, searche)), con=connection)

    ca_debut_periode = utils.toInt(data=ca_debut_periode)
    evo_periode = utils.toInt(data=evo_periode)
    ca_fin_periode = utils.toInt(data=ca_fin_periode)

    # Je prends la moitier des moyennes des valeurs de début et fin de période
    evo_periode['trans'] = int(((ca_debut_periode.iloc[0, 0] + ca_fin_periode.iloc[0, 0]) / 2) / 2)

    evo_periode.loc[-0.1] = [ca_debut_periode.columns[0], ca_debut_periode.iloc[0, 0], 0, 0]
    evo_periode.loc[len(evo_periode)] = [ca_fin_periode.columns[0], ca_fin_periode.iloc[0, 0], 0, 0]
    evo_periode = evo_periode.sort_index().reset_index(drop=True)
    evo_periode['difference'] = evo_periode['hausse'] + evo_periode['baisse']
    evo_periode['baisse'] = evo_periode['baisse'] * (-1)

    axis = evo_periode['dates'].tolist()
    val = evo_periode['difference'].tolist()
    hausse = evo_periode['hausse'].tolist()
    baisse = evo_periode['baisse'].tolist()
    trans = evo_periode['trans'].tolist()
    data_final = {'axis': axis, 'val': val, 'hausse': hausse, 'baisse': baisse, 'trans': trans}

    return data_final


class ClientTop200:

    @staticmethod
    def dataToDictAg(data):
        df = data.copy()

        def formatype(col_type, index_col, row):
            if col_type == 'float64':
                try:
                    value = float(round(df.iloc[row, index_col], 2))
                except:
                    value = None
            elif col_type == 'int64':
                try:
                    value = int(df.iloc[row, index_col])
                except:
                    value = None
            else:
                value = str(df.iloc[row, index_col])
            return value

        dict_lists = [
            {df.columns[index_col]: formatype(col_type=df[col].dtype, index_col=index_col, row=row)
             for index_col, col in enumerate(df.columns)}
            for row in range(df.shape[0])
        ]
        return dict_lists

    def getClient(self, sheet_name):
        df = pd.read_excel("analytics/data/client.xlsx", sheet_name=sheet_name)
        pourcents = ['Total', 'Fixe', 'Mobile', 'Broadband']
        df = utils.pourcentCol(df, pourcents)

        df.rename(str.lower, axis='columns', inplace=True)
        df.rename(str.strip, axis='columns', inplace=True)
        df.columns = [str(col).replace(' ', '_') for col in df.columns]
        df = df.fillna(0)
        data = self.dataToDictAg(data=df)

        return data

    def getGraphData(self, sheet_name):
        df = pd.read_excel("analytics/data/client.xlsx", sheet_name=sheet_name)
        df["dates"] = pd.to_datetime(df["dates"], format='%Y-%m-%d', errors='ignore')
        df['dates'] = df['dates'].dt.strftime('%b %y')
        df['dates'] = df['dates'].astype(str)

        m = df.select_dtypes(np.number)
        df[m.columns] = m.round(2)

        pourcents = ['Contribution totale au CAF', ]
        df = utils.pourcentCol(df, pourcents)
        df.rename(str.strip, axis='columns', inplace=True)
        df = df.fillna(0)

        axis = df['dates'].tolist()
        caf = df['CAF YTD (mxof)'].tolist()
        pourcent = df['Contribution totale au CAF'].tolist()
        data_final = {'axis': axis, 'caf': caf, 'pourcent': pourcent}

        return data_final


def CAUnivers():
    df = pd.read_excel("analytics/data/client.xlsx", sheet_name="Univers CA")
    df.rename(str.strip, axis='columns', inplace=True)
    df.rename(str.lower, axis='columns', inplace=True)
    df["dates"] = pd.to_datetime(df["dates"], format='%Y-%m-%d', errors='ignore')

    date = datetime.strptime('2022-01-01', '%Y-%m-%d')
    df_2022 = df[df['dates'] >= date].copy()
    df_2022['dates'] = df_2022['dates'].dt.strftime('%b %y')
    df_2022['dates'] = df_2022['dates'].astype(str)
    df_2022 = df_2022.drop(columns=['total', 'dates'])

    df_2021 = df[df['dates'] < date].copy()
    df_2021['dates'] = df_2021['dates'].dt.strftime('%b %y')
    df_2021['dates'] = df_2021['dates'].astype(str)
    df_2021 = df_2021.drop(columns=['total', 'dates'])

    data_final = {
        f"{col}": {
            "value": float(round(df_2022[col].sum(), 2)),
            "evo": float(round((df_2022[col].sum() / df_2021[col].sum()) - 1, 2)) * 100
        }
        for col in df_2022.columns
    }
    # data_final = {f"{col}": float(round(df_2022[col].sum(), 2)) for col in df_2022.columns}
    return data_final
