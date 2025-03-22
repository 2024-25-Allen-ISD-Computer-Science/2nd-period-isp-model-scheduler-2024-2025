data_dict = {}
ignore = []
STEAM = []
classes = []

with open("STEAM_Classes.txt") as file:
    STEAM_data = file.readlines()

for line in STEAM_data:
    STEAM.append(line.replace('\n', ''))

with open("data.csv") as file:
    data = file.readlines()

file = open("data2.tsx", "w")

def clean_arr(arr):
    new_arr = []
    for item in arr:
        did_change = True
        while did_change:
            did_change = False
            if len(item) > 1 and item != '':
                if item[-1] == ' ':
                    item = item[:len(item) - 1]
                    did_change = True
                if item[0] == ' ':
                    item = item[1:]
                    did_change = True
        new_arr.append(item.replace('\n', ''))
    return new_arr

# Create an array of all the classes
for item in data:
    # Breaking csv into the classes inside
    split_array = ['S1,S2', '","', ',"', '",', ',', '"', ';']
    for split in split_array:
        item = item.replace(split, '__SPLIT__')
    arr = item.split('__SPLIT__')
    arr = arr[3:]

    # Fill out the classes array
    for specific_class in arr:
        if '-' in specific_class:
            class_name = specific_class[specific_class.index('-') + 1:]
            if class_name not in classes:
                classes.append(class_name)
classes = clean_arr(classes)

# Return parsed array of all the classes in periods
def period_array(string):
    periods = string.replace('S1,S2', '').replace('"', '').replace('\n', '').split(',')

    new_periods = []
    for item in periods:
        if item == '':
            new_periods.append('empty')
        else:
            new_periods.append(item)

    periods = []
    for item in new_periods:
        if item != '':
            periods.append(item)
    if len(periods) == 8:
        periods.append('empty')
    return periods[3:]

# Populate the dict
id = 0
for class_name in classes:
    department_value = ""
    periods_value = []
    term_value = []

    # Populate department_value
    if class_name in STEAM:
        department_value = "STEAM"
    else:
        department_value = "AHS"
    
    # Populate periods_value
    for line in data:
        teacher_periods = period_array(line)
        for index in range(0, len(teacher_periods)):
            if class_name in teacher_periods[index]:
                periods_value.append(index + 1)
        periods_value = list(set(periods_value))

    # Populate term_value
    if 'S1' in class_name or 'Fall' in class_name:
        term_value = [1]
        class_name = class_name.replace('S1', 'Fall')
    elif 'S2' in class_name or 'Spring' in class_name:
        term_value = [2]
        class_name = class_name.replace('S2', 'Spring')
    elif 'S1' not in class_name and 'S2' not in class_name:
        term_value = [1, 2]
    
    # Populate dict
    data_dict[id] = {
                        'name': class_name,
                        'department': department_value,
                        'periods': periods_value,
                        'term': term_value,
                        'total_enrollment': 0,
                        'max_positions': 0,
                    }
    id += 1
    print(f"\nAdded course: {class_name}\n{class_name} id: {id}\n{class_name} department: {department_value}\n{class_name} periods: {periods_value}\n{class_name} term: {term_value}")

file.write(str(data_dict))
print('\nData written to file: data2.tsx')