import requests
from bs4 import BeautifulSoup
from csv import writer

# scraper for Institutions
with open("Institutions.csv", "w") as csv_file:
    csv_writer = writer(csv_file)
    headers = ["name", "abbr", "location", "website"]
    csv_writer.writerow(headers)

    i = 0

    while True:
        i += 1
        page = (
            "http://niid.lv/niid_search?qy=&ct=&tg=&v=prov&level_1=8%7C9%7C7&page="
            + str(i)
        )
        response = requests.get(page)
        soup = BeautifulSoup(response.text, "html.parser")
        posts = soup.find_all(class_="lo_p")

        if posts == []:
            break

        for post in posts:
            name = post.get_text()
            abbr = None

            infoLink = "http://niid.lv" + post.find("a")["href"]
            response = requests.get(infoLink)
            institInformation = BeautifulSoup(response.text, "html.parser")

            location = (
                institInformation.find(class_="ns-prov").find_all("div")[2].get_text()
            )
            website = institInformation.find(class_="ns-prov").find_all("a")[1]["href"]
            csv_writer.writerow([name, abbr, location, website])

        print(i)

# Scraper for study programmes
with open("Programmes.csv", "w") as csv_file:
    csv_writer = writer(csv_file, delimiter="|")
    headers = [
        "name",
        "Institution",
        "degree",
        "duration",
        "faculty",
        "learning_type",
        "full_time",
        "budget_places",
        "total_places",
        "study_costs",
        "study_language",
        "website",
        "description",
    ]
    csv_writer.writerow(headers)

    i = 0

    while True:
        i += 1
        page = "http://niid.lv/niid_search?qy=&ct=&tg=&level_1=8|9|7&page=" + str(i)
        response = requests.get(page)
        soup = BeautifulSoup(response.text, "html.parser")
        posts = soup.find_all(class_="title")

        if posts == []:
            break

        for post in posts:
            infoLink = "http://niid.lv" + post.find("a")["href"]
            response = requests.get(infoLink)
            soup = BeautifulSoup(response.text, "html.parser")
            programmeInformation = soup.find(class_="ns-program-view")

            name = programmeInformation.find(class_="lo_t").get_text()
            institution = (
                programmeInformation.find(class_="lo_provider").find("a").get_text()
            )

            faculty = programmeInformation.find(class_="ns-prov-locs").find("a")

            if faculty is not None:
                faculty = faculty.get_text()

            programmeInformation = programmeInformation.find(class_="ns-lo-table")

            degree = programmeInformation.find(class_="lo_label", string="Grāds")
            if degree is None:
                degree = programmeInformation.find(
                    class_="lo_label", string="Izglītības dokuments"
                )
            degree = degree.find_next_sibling(class_="lo_value").get_text()

            duration = (
                programmeInformation.find(class_="lo_label", string="Ilgums")
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            learning_type = (
                programmeInformation.find(
                    class_="lo_label", string="Izglītības ieguves forma"
                )
                .find_next_sibling(class_="lo_value")
                .get_text()
            )
            learning_type = learning_type.replace(";", "/")

            full_time = (
                programmeInformation.find(class_="lo_label", string="Studiju veids")
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            if "Pilna" in full_time and "Nepilna" not in full_time:
                full_time = True, False
            elif "Pilna" in full_time and "Nepilna" in full_time:
                full_time = True, True
            elif "Pilna" not in full_time and "Nepilna" in full_time:
                full_time = False, True
            else:
                full_time = False, False

            budget_places = (
                programmeInformation.find(
                    class_="lo_label", string="Mācību/studiju maksa"
                )
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            if "Valsts budžets" in budget_places:
                budget_places = True
            else:
                budget_places = False

            total_places = None

            study_costs = (
                programmeInformation.find(
                    class_="lo_label", string="Mācību/studiju maksa"
                )
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            study_language = (
                programmeInformation.find(class_="lo_label", string="Mācību valoda")
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            website = programmeInformation.find(
                class_="lo_label", string="Programmas mājaslapa"
            )
            if website is not None:
                website = website.find_next_sibling(class_="lo_value").find("a")["href"]

            description = (
                programmeInformation.find(
                    class_="lo_label", string="Programmas apraksts"
                )
                .find_next_sibling(class_="lo_value")
                .get_text()
            )

            csv_writer.writerow(
                [
                    name,
                    institution,
                    degree,
                    duration,
                    faculty,
                    learning_type,
                    full_time,
                    budget_places,
                    total_places,
                    study_costs,
                    study_language,
                    website,
                    description,
                ]
            )
