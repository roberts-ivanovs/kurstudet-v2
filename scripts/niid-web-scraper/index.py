import requests
from bs4 import BeautifulSoup
from csv import writer

response = requests.get(
    'http://niid.lv/niid_search?qy=&ct=&tg=&v=prov&level_1=8%7C9%7C7&page=1')

soup = BeautifulSoup(response.text, 'html.parser')

posts = soup.find_all(class_='lo_p')

with open('Institutions.csv', 'w') as csv_file:
    csv_writer = writer(csv_file)
    headers = ['name', 'abbr', 'location', 'website']
    csv_writer.writerow(headers)

    for post in posts:
        name = post.get_text()
        abbr = None

        infoLink = 'http://niid.lv' + post.find('a')['href']
        response = requests.get(infoLink)
        institInformation = BeautifulSoup(response.text, 'html.parser')

        location = institInformation.find(
            class_="ns-prov").find_all('div')[2].get_text()
        website = institInformation.find(
            class_="ns-prov").find_all('a')[1]['href']
        csv_writer.writerow([name, abbr, location, website])
