import csv
import json

csv_filename = "responses.csv"
json_filename = "responses.json"

with open(csv_filename, mode="r", encoding="utf-8") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = list(csv_reader)

with open(json_filename, mode="w", encoding="utf-8") as json_file:
    json.dump(data, json_file, indent=4)

print(json.dumps(data, indent=4))