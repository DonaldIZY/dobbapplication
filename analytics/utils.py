import numpy as np


def toInt(data):
    df = data.copy()
    df = df.fillna(0)
    m = df.select_dtypes(np.number)
    df[m.columns] = m.round().astype(np.int64)
    return df


def formatDf(df, *args):
    df = df.copy()
    df = df.T
    df = df.rename_axis(['axis']).reset_index()
    df.columns = args[0]
    return df


def pourcentCol(data, *col_liste):
    df = data.copy()
    for col in col_liste[0]:
        df[col] = df[col] * 100
    return df.copy()



