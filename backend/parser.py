import csv
import os
import django
import re

os.environ.setdefault("DJANGO_SETTINGS_MODULE",
"api.settings")
django.setup()

from education.models import Institution, Programme


def parse_institutuins():
    with open("sample_institutions.csv") as file:
        reader = csv.DictReader(file)

        for row in reader:
            Institution.objects.create(
                name=row["name"],
                abbr=row["abbr"],
                location=row["location"],
                website=row["website"],
            )


def parse_programmes():
    with open("sample_programmes.csv") as file:
        reader = csv.DictReader(file)
        extract_number =  re.compile("\d+", re.I|re.M)

        for row in reader:

            duration = None
            study_costs = None
            for i in extract_number.findall(row["duration"]):
                duration = i
            for i in extract_number.findall(row["study_costs"]):
                study_costs = i

            if not duration or not study_costs:
                print("INCORRECT DURATION SUPPLIED")

            Programme.objects.create(
                name=row['name'],
                institution=Institution.objects.get(name=row['institution']),
                degree=row['degree'],
                duration_years=duration,
                faculty=row['faculty'],
                learning_type=row['learning_type'],
                full_time=row['full_time'],
                budget_places=row['budget_places'] == "True",
                total_places=row['total_places'] or None,
                study_costs=study_costs,
                study_language=row['study_language'],
                website=row['website'],
                description=row['description']
            )


if __name__ == "__main__":
    # parse_institutuins()
    parse_programmes()
