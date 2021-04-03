import json
import numpy as np
import pandas as pd

raw2020 = pd.read_csv('./2020/all2020.csv')

# print(raw2020.head())

stationFilter = raw2020.drop_duplicates(subset='start station id')
# print(stationFilter)

stations = {}

for index, row in stationFilter.iterrows():
    stations[row['start station id']] = {
        'name': row['start station name'],
        'latitude': row['start station latitude'],
        'longitude': row['start station longitude']
    }

f = open('stations.json', 'w')
f.write(json.dumps(stations))
f.close()
