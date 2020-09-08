from csv import writer

with open('Institutions.csv', 'w') as csv_file:
    csv_writer = writer(csv_file)
    headers = ['name', 'abbr', 'location', 'website']
    csv_writer.writerow(headers)
