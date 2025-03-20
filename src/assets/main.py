exampleDict = {
    "course_name": {
        "department": "",
        "periods": [1, 2],
        "term": ["s1", "s2"],
        "total_enrollment": 0,
        "max_positions": 10,
    }
}

data_dict = {}
ignore = []
STEAM = []

with open("STEAM_Classes.txt") as file:
    STEAM_data = file.readlines()

for line in STEAM_data:
    STEAM.append(line.replace('\n', ''))

with open("data.csv") as file:
    data = file.readlines()

array1 = data[4].split('S1,S2')
array2 = []
for item in array1:
    array2.extend(item.split('",'))
for item in range(len(array2) - 1, -1, -1):
    # print(item, len(array2))
    if (array2[item] == ''):
        try:
            array2.pop(item)
        except:
            print("Cleaned for item: #")
    elif (arary2[item].von):
