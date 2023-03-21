from pprint import pprint

from sqlalchemy import create_engine, text
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

import locale
from analytics import utils

locale.setlocale(locale.LC_ALL, '')

engine = create_engine(
    "postgresql+psycopg2://postgres:password@localhost:5432/BSCS",
    # isolation_level="SERIALIZABLE",
)
connection = engine.connect()

M = 1000000


def extremitePeriode(univers, date, search):
    request = f"""
        SELECT COALESCE(sum(montant), 0) as "CA {date}" from public.base_dobb
        WHERE univers='{univers}' and date_facture = '{date}' 
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {search};
    """
    return request


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


def extremiteYTD(univers, date, search):
    date = datetime.strptime(date, "%Y-%m-%d")
    date_ytd = date - timedelta(days=365)
    date_ytd = datetime.strftime(date_ytd, "%Y-%m-%d")
    date = datetime.strftime(date, "%Y-%m-%d")

    request = f"""
        SELECT COALESCE(sum(montant), 0) as "CA {date}" from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{date_ytd}' AND '{date}') 
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {search};
    """
    return request


def getTop200(date_debut, date_fin, search, limit):
    request = f"""
        SELECT client, segment, commercial, total_montant_, max_montant_, broadband_, fixe_, ict_, mobile_, 
               row_number() over (order by total_montant_ DESC, max_montant_ DESC) as rang
        FROM (
            SELECT client, segment, commercial, COALESCE(SUM(montant), 0) as total_montant_, 
            COALESCE(MAX(montant), 0) as max_montant_,
            COALESCE(sum(case when (univers='Broadband') then montant end), 0) as broadband_,
            COALESCE(sum(case when (univers='Fixe') then montant end), 0) as fixe_,
            COALESCE(sum(case when (univers='ICT') then montant end), 0) as ict_,
            COALESCE(sum(case when (univers='Mobile') then montant end), 0) as mobile_
            FROM public.base_dobb
            WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
            GROUP BY client, segment, commercial
        ) subq
        ORDER BY total_montant_ DESC, max_montant_ DESC
        LIMIT {limit};
    """

    return request


def getParcAtif(univers, get, debut_periode, fin_periode, search):
    # Cette requête permet d'obtenir la somme du parc actif (ou le CA) par mois

    select_type = "count(id)"
    if get == 'ca':
        select_type = "sum(montant)"

    request = f"""
        SELECT date_facture as dates, {select_type} as parc_actif from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}')
        and statut in ('Activation', 'Montée en valeur', 'Retour de suspension', 'Baisse en valeur', 'Suspension')
        {search}
        GROUP BY dates
        ORDER BY dates;
    """

    df = pd.read_sql(sql=text(request), con=connection)
    # Définir le format de la date Déc 22
    df["dates"] = pd.to_datetime(df["dates"], format='%Y-%m-%d', errors='ignore').dt.strftime('%b %y').astype(str)

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


def getEvoPeriode(univers, debut_periode, fin_periode, evo_type, search):
    # Réalisé dans la période par parc (statut)
    request = f"""
        SELECT 
            COALESCE(sum(case when (statut='Activation') then dif_montant end), 0) as "Activation",
            COALESCE(sum(case when (statut='Montée en valeur') then dif_montant end), 0) as "Montée en valeur",
            COALESCE(sum(case when (statut='Retour de suspension') then dif_montant end), 0) as "Retour de suspension",
            COALESCE(sum(case when (statut='Baisse en valeur') then dif_montant end), 0) as "Baisse en valeur",
            COALESCE(sum(case when (statut='Suspension') then dif_montant end), 0) as "Suspension"
            from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}') {search};
    """

    # Détermine le CA de début et fin de période selon qu'il s'agisse de
    if evo_type == 'ytd':
        cumule_debut_periode = pd.read_sql(sql=text(extremiteYTD(univers, debut_periode, search)), con=connection)
        cumule_fin_periode = pd.read_sql(sql=text(extremiteYTD(univers, fin_periode, search)), con=connection)

    else:
        cumule_debut_periode = pd.read_sql(sql=text(extremitePeriode(univers, debut_periode, search)), con=connection)
        cumule_fin_periode = pd.read_sql(sql=text(extremitePeriode(univers, fin_periode, search)), con=connection)

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


def getHausseBasse(univers, debut_periode, fin_periode, search):

    request = f"""
        SELECT date_facture as dates,
            sum(case when (statut in ('Activation', 'Montée en valeur', 'Retour de suspension')) then dif_montant else NULL end) as hausse,
            sum(case when (statut in ('Baisse en valeur', 'Suspension')) then dif_montant else NULL end) as baisse
            from public.base_dobb
        WHERE univers='{univers}' and (date_facture BETWEEN '{debut_periode}' AND '{fin_periode}') {search}
        group by dates
        order by dates;
    """

    ca_debut_periode = pd.read_sql(sql=text(extremitePeriode(univers, debut_periode, search)), con=connection)
    evo_periode = pd.read_sql(sql=text(request), con=connection)
    evo_periode["dates"] = pd.to_datetime(evo_periode["dates"], format='%Y-%m-%d', errors='ignore')
    evo_periode['dates'] = evo_periode['dates'].dt.strftime('%b %y')
    evo_periode['dates'] = evo_periode['dates'].astype(str)
    ca_fin_periode = pd.read_sql(sql=text(extremitePeriode(univers, fin_periode, search)), con=connection)

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

    def getEntrant(self, date_debut, date_fin):
        diff = datetime.strptime(date_fin, "%Y-%m-%d") - datetime.strptime(date_debut, "%Y-%m-%d")
        diff = diff + relativedelta(months=1)

        periode_pred_1 = (datetime.strptime(date_debut, "%Y-%m-%d") - diff).replace(day=1)
        periode_pred_1 = (periode_pred_1 - relativedelta(months=1)).strftime("%Y-%m-%d")
        periode_pred_2 = (datetime.strptime(date_fin, "%Y-%m-%d") - diff).replace(day=1).strftime("%Y-%m-%d")

        request = getTop200(date_debut=date_debut, date_fin=date_fin, search='', limit=200)
        t1 = pd.read_sql(sql=text(request), con=connection)
        request = getTop200(date_debut=periode_pred_1, date_fin=periode_pred_2, search='', limit=5000)
        t2 = pd.read_sql(sql=text(request), con=connection)
        client_entrant = pd.merge(t1, t2, how='left', on=['client', 'segment', 'commercial'])

        for i in range(3, 9):
            col_entrant = client_entrant.columns[i].split('__')[0]
            client_entrant[f'{col_entrant}'] = (client_entrant[f'{col_entrant}__x'] / client_entrant[
                f'{col_entrant}__y']) - 1

        client_entrant = client_entrant.rename(columns={'rang_x': 'rang', 'rang_y': 'rang_prec'})

        # Sélectionner les noms de colonnes qui ne se terminent pas par '__x' ou '__y'
        cols_to_keep_entrant = [col for col in client_entrant.columns if not col.endswith(('__x', '__y'))]

        # Supprimer les colonnes sélectionnées
        client_entrant = client_entrant[cols_to_keep_entrant].copy().reset_index(drop=True)

        client_entrant = client_entrant[client_entrant['rang_prec'] > 200].copy().reset_index(drop=True)
        return client_entrant

    def getClient(self, sheet_name):
        df = pd.read_excel("analytics/data/client.xlsx", sheet_name=sheet_name)
        pourcents = ['Total', 'Fixe', 'Mobile', 'Broadband']
        df = utils.pourcentCol(df, pourcents)

        df.rename(str.lower, axis='columns', inplace=True)
        df.rename(str.strip, axis='columns', inplace=True)
        df.columns = [str(col).replace(' ', '_') for col in df.columns]
        df = df.fillna(0)
        data = dataToDictAg(data=df)

        return data

    def getClientEntrant(self, date_debut, date_fin):
        client_entrant = self.getEntrant(date_debut=date_debut, date_fin=date_fin)
        client_entrant['commercial'] = client_entrant['commercial'].fillna(value='')
        client_entrant = client_entrant.fillna(0)
        client_entrant = client_entrant[['client', 'segment', 'commercial', 'mobile', 'fixe',
                                         'ict', 'broadband', 'rang', 'rang_prec']]
        client_entrant = client_entrant.round(2)
        data = client_entrant.astype(str).values.tolist()
        return data

    def getGraphData(self, sheet_name, date_debut, date_fin, search):
        request = f"""
            SELECT 
                date_facture, 
                SUM(montant) AS "CA top 200", 
                SUM(montant) / SUM(subquery.total_montant) * 10000 AS "Contribution CA Global" 
            FROM 
                public.base_dobb
            INNER JOIN 
                (
                    SELECT
                        client,
                        SUM(montant) AS montant_total 
                    FROM 
                        public.base_dobb 
                    GROUP BY 
                        client 
                    ORDER BY 
                        montant_total DESC 
                    LIMIT 
                        200
                ) AS top_200 
                ON public.base_dobb.client = top_200.client 
            CROSS JOIN 
                (
                    SELECT 
                        SUM(montant) AS total_montant 
                    FROM 
                        public.base_dobb
                ) AS subquery
            WHERE
                date_facture BETWEEN '{date_debut}' AND '{date_fin}'
            GROUP BY date_facture;
        """

        df = pd.read_sql(sql=text(request), con=connection)

        df["date_facture"] = pd.to_datetime(df["date_facture"], format='%Y-%m-%d', errors='ignore')
        df['date_facture'] = df['date_facture'].dt.strftime('%b %y')
        df['date_facture'] = df['date_facture'].astype(str)

        m = df.select_dtypes(np.number)
        df[m.columns] = m.round(2)

        pourcents = ['Contribution CA Global', ]
        df = utils.pourcentCol(df, pourcents)
        df.rename(str.strip, axis='columns', inplace=True)
        df = df.fillna(0)

        axis = df['date_facture'].tolist()
        caf = df['CA top 200'].tolist()
        pourcent = df['Contribution CA Global'].tolist()
        data_final = {'axis': axis, 'caf': caf, 'pourcent': pourcent}

        return data_final


def CAUnivers(date_debut, date_fin, search):
    request = f"""
        SELECT date_facture, 
            COALESCE(sum(case when (univers='Broadband') then montant end), 0) as broadband,
            COALESCE(sum(case when (univers='Fixe') then montant end), 0) as fixe,
            COALESCE(sum(case when (univers='ICT') then montant end), 0) as ict,
            COALESCE(sum(case when (univers='Mobile') then montant end), 0) as mobile,
            COALESCE(SUM(montant), 0) as total
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY date_facture
    """

    df = pd.read_sql(sql=text(request), con=connection)

    df["date_facture"] = pd.to_datetime(df["date_facture"], format='%Y-%m-%d', errors='ignore')

    date = datetime.strptime('2022-01-01', '%Y-%m-%d')
    df_2022 = df[df['date_facture'] >= date].copy()
    df_2022['date_facture'] = df_2022['date_facture'].dt.strftime('%b %y')
    df_2022['date_facture'] = df_2022['date_facture'].astype(str)
    df_2022 = df_2022.drop(columns=['total', 'date_facture'])

    df_2021 = df[df['date_facture'] < date].copy()
    df_2021['date_facture'] = df_2021['date_facture'].dt.strftime('%b %y')
    df_2021['date_facture'] = df_2021['date_facture'].astype(str)
    df_2021 = df_2021.drop(columns=['total', 'date_facture'])

    data_final = {
        f"{col}": {
            "value": float(round(df_2022[col].sum(), 2)),
            "evo": float(round((df_2022[col].sum() / df_2021[col].sum() - 1), 2)) * 100
            if df_2021[col].sum() != 0 else 0
        }
        for col in df_2022.columns
    }
    # data_final = {f"{col}": float(round(df_2022[col].sum(), 2)) for col in df_2022.columns}
    return data_final


def caUniversCommerciaux(date_debut, date_fin, search):
    request = f"""
        SELECT
            COALESCE(sum(case when (univers='Broadband') then montant end), 0) as "Broadband",
            COALESCE(sum(case when (univers='Fixe') then montant end), 0) as "Fixe",
            COALESCE(sum(case when (univers='ICT') then montant end), 0) as "ICT",
            COALESCE(sum(case when (univers='Mobile') then montant end), 0) as "Mobile"
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
    """

    ca_univers = pd.read_sql(sql=text(request), con=connection)
    ca_univers = dataToDictAg(data=ca_univers)

    data = []
    for key, value in ca_univers[0].items():
        data.append({"value": value, "name": key})

    return data


def getNbMois(date_debut, date_fin):
    request = f"""
        select count(distinct date_facture) from public.base_dobb
        where date_facture between '{date_debut}' and '2{date_fin}'
    """

    df = pd.read_sql(sql=text(request), con=connection)
    nb_mois = df['count'][0]
    return nb_mois


def performGenerale(date_debut, date_fin, search):
    request = f"""      
        SELECT date_facture, 
            COALESCE(SUM(montant), 0) as total_montant
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY date_facture;
    """

    df = pd.read_sql(sql=text(request), con=connection)
    df['dates'] = pd.to_datetime(df['date_facture'], format='%Y-%m-%d').dt.strftime('%b %y')
    df['dates'] = df['dates'].astype(str)

    dates = df['dates'].tolist()
    total_montant = df['total_montant'].tolist()
    data_final = {'total_montant': total_montant, 'dates': dates}

    return data_final


def produit(date_debut, date_fin, search):
    request = f"""
        SELECT groupe_produit, COALESCE(SUM(montant), 0) as total_montant
            FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY groupe_produit
        ORDER BY total_montant DESC
        limit 5;
    """

    df = pd.read_sql(sql=text(request), con=connection)

    product = df['groupe_produit'].tolist()
    ca = df['total_montant'].tolist()
    data_final = {'product': product, 'ca': ca}

    return data_final


def topClient(date_debut, date_fin, search):
    request = f"""
        SELECT client, SUM(montant) AS total_montant
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY client
        ORDER BY total_montant DESC
        LIMIT 5;
    """

    df = pd.read_sql(sql=text(request), con=connection)

    client = df['client'].tolist()
    total_montant = df['total_montant'].tolist()
    data_final = {'client': client, 'total_montant': total_montant}

    return data_final


def top_80_20(date_debut, date_fin, search):
    request_ca_client = f"""
        SELECT client, secteur_activite,
        COALESCE(sum(case when (univers='Mobile') then montant end), 0) as mobile,
        COALESCE(sum(case when (univers='Fixe') then montant end), 0) as fixe,
        COALESCE(sum(case when (univers='ICT') then montant end), 0) as ict,
        COALESCE(sum(case when (univers='Broadband') then montant end), 0) as broadband,
        SUM(montant) AS total_montant
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY client, secteur_activite
        HAVING SUM(montant) > 0
        ORDER BY SUM(montant) DESC;
    """

    request_global = f"""
        SELECT SUM(montant) as total, COUNT(DISTINCT client) as nb_client
        FROM public.base_dobb
        WHERE date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search};
    """

    df = pd.read_sql(sql=text(request_ca_client), con=connection)
    df = df.fillna(value='')
    df_2 = pd.read_sql(sql=text(request_global), con=connection)
    keep_percent = df_2['total'][0] * 0.8

    # Calculer la somme cumulée
    df['cumulative_sum'] = df['total_montant'].cumsum()
    result = df[df['cumulative_sum'] >= keep_percent].copy().reset_index(drop=True)
    result = result.drop(columns=['cumulative_sum'])
    client_part = (result.shape[0] / df_2['nb_client']) * 100

    data = result.astype(str).values.tolist()
    return data, client_part


def recapData(colonne, date_debut, date_fin, search):
    request = f"""
        select {colonne},
        count(CASE WHEN (montant> 0) THEN id else null END) as "Nb Client",
        sum(montant) as "CA Cumulé"
        from public.base_dobb
        where date_facture between '{date_debut}' and '{date_fin}' {search}
        group by {colonne};
    """

    df = pd.read_sql(sql=text(request), con=connection)
    nb_mois = getNbMois(date_debut, date_fin)
    df['CA Moyen'] = df['CA Cumulé'] / nb_mois
    df['CA Moyen'] = df['CA Moyen'].round(0)

    data = df.astype(str).values.tolist()
    return data


def getDistinctProduct(colonne):
    request = f"""select distinct {colonne} from public.base_dobb;"""
    df = pd.read_sql(sql=text(request), con=connection)
    return df[colonne].tolist()


def getTopPerformers(colonne, choix, date_debut, date_fin, search):
    request = f"""
        SELECT commercial, SUM(montant) AS total_montant FROM PUBLIC.base_dobb
            WHERE {colonne}='{choix}' AND date_facture BETWEEN '{date_debut}' AND '{date_fin}' {search}
        GROUP BY commercial
        ORDER BY total_montant DESC
        LIMIT 10;
    """

    df = pd.read_sql(sql=text(request), con=connection)
    commerciaux = df['commercial'].tolist()
    total_montant = df['total_montant'].tolist()
    data_final = {'commerciaux': commerciaux, 'total_montant': total_montant}
    return data_final



client_sortant = f"""
    WITH top200_previous AS (
        -- récupérer le top 200 précédent
        SELECT client
        FROM (
            SELECT client, ROW_NUMBER() OVER (ORDER BY total_montant_ DESC, max_montant_ DESC) AS rang
            FROM (
                SELECT client, COALESCE(SUM(montant), 0) AS total_montant_, COALESCE(MAX(montant), 0) AS max_montant_
                FROM public.base_dobb
                WHERE date_facture BETWEEN '2021-10-01' AND '2022-01-01'
                GROUP BY client
            ) subq
            ORDER BY total_montant_ DESC, max_montant_ DESC
            LIMIT 200
        ) subq
    )
    SELECT client
    FROM top200_previous
    WHERE client NOT IN (
        -- récupérer le top 200 actuel
        SELECT client
        FROM (
            SELECT client, ROW_NUMBER() OVER (ORDER BY total_montant_ DESC, max_montant_ DESC) AS rang
            FROM (
                SELECT client, COALESCE(SUM(montant), 0) AS total_montant_, COALESCE(MAX(montant), 0) AS max_montant_
                FROM public.base_dobb
                WHERE date_facture BETWEEN '2022-01-01' AND '2022-03-01'
                GROUP BY client
            ) subq
            ORDER BY total_montant_ DESC, max_montant_ DESC
            LIMIT 200
        ) subq
    );
"""
