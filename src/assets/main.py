exampleDict = {
    "course_name": {
        "department": "",
        "periods": [1, 2],
        "term": ["s1", "s2"],
        "total_enrollment": 0,
        "max_positions": 10,
    }
}

# Example CSV data
data_dict = {}
ignore = []

with open("test_data.csv") as file:
    data = file.readlines()

for i in range(2, len(data)):
    data[i] = data[i].replace('\n', '')
    columns = data[i].split(',')

    if "Period" not in columns[1]:
        if not columns[0] in data_dict:
            new_dict = {columns[0]: {
                "department": columns[1],
                "periods": [],
                "term": columns[3],
                "total_enrollment": columns[7],
                "max_positions": columns[6],
            }}
            data_dict.update(new_dict)

for item in data_dict:
    print(item)