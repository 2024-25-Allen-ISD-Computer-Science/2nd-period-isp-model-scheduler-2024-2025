def parse_csv(csv_string):
    # Split the input CSV string by newlines to get the rows
    rows = csv_string.split('\n')
    
    # Strip any extra spaces from the rows and filter out empty rows
    rows = [row.strip() for row in rows if row.strip()]
    
    # Extract headers (first row of CSV)
    headers = rows[0].split(',')
    result = []
    
    # Loop through the rest of the rows
    for row in rows[1:]:
        columns = row.split(',')
        row_dict = {headers[i].strip(): columns[i].strip() for i in range(len(headers))}
        result.append(row_dict)
    
    return result

# Example CSV data
with open("test_data.csv") as file:
    data = file.read()

parsed_data = parse_csv(data)
print(parsed_data)

