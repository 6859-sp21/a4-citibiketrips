import json
import numpy as np
import pandas as pd

raw2020 = pd.read_csv('./2020/all2020.csv')

# print(raw2020.head())

stationFilter = raw2020.drop_duplicates(subset='start station id')
# print(stationFilter)

stations = {}

for index, row in stationFilter.iterrows():
    try: 
        stations[int(row['start station id'])] = {
            'name': row['start station name'],
            'latitude': float(row['start station latitude']),
            'longitude': float(row['start station longitude'])
        }
    except:
        continue

# for i in stations:
#     print(i, stations[i])
# print(len(stations.keys()))

# stations as a dict
# f = open('stations.json', 'w')
# f.write(json.dumps(stations))
# f.close()

# stations as a list
# list_stations = []
# for i in stations:
#     temp = stations[i]
#     temp['id'] = i
#     list_stations.append(temp)

# f = open('list_stations.json', 'w')
# f.write(json.dumps(list_stations))
# f.close()

