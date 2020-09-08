# NIID.LV WEB SCRAPER

## About

This `index.py` script must perform the action collecting all of the necessary
data from niid.lv website. There are two crucial parts of information that must
be collected:

1. Information about study programmes
2. Information about higher education institutions (schools)

The `index.py` script must generate two separate `.csv` files, one file for each
type of collected data.

### Programmes

All of the necessary data can be found on
[this site](niid.lv/niid_search?qy=&ct=&tg=&level_1=8|9|7&page=1), excluding the
page number that's in the URL. We are interested in ALL of the higher education
study programmes available in Latvia (thus available on niid.lv with the
selected filters).

The layout of the csv file must be as follows (The data can be found from every
entry of the aforementioned list,
[when clicking on it](http://niid.lv/niid_search/program/919?qy=Datorzin%C4%81tnes&ct=&tg=&level_1=7%7C8%7C9)):

| name          | institution          | degree            | duration | faculty                            | learning_type   | full_time | budget_places | total_places | study_costs   | study_language         | website                                  | description            |
| ------------- | -------------------- | ----------------- | -------- | ---------------------------------- | --------------- | --------- | ------------- | ------------ | ------------- | ---------------------- | ---------------------------------------- | ---------------------- |
| Datorzinātnes | Ventspils Augstskola | Bakalaura diploms | 3 gadi   | Informācijas tehnoloģiju fakultāte | Klātiene dienas | True      | True          |              | 2270 EUR gadā | latviešu/angļu (LV/EN) | venta.lv/program/bakalaura-datorzinatnes | (the long description) |

There are some caveats for such a layout:

1. `total_places` cannot be determined from the niid.lv website alone therefore
   we leave this field empty for now.
2. `full_time` will be `True` when "Studiju veids" field on the website will say
   "Pilna laika"
3. `study_costs` must be extracted from the "Mācību/studiju maksa" field on the
   website (regex can help here), but it is not going to be easy as the data is
   ever changing.
4. `budget_places` must also be extracted from "Mācību/studiju maksa" field on
   the website, but this should not be too difficult as a simple check for the
   word `Valsts budžets` is within the parsed string value.

### Institution

All of the necessary data can be found on
[this site](http://niid.lv/niid_search?qy=&ct=&tg=&v=prov&level_1=8%7C9%7C7&page=1),
excluding the page number that's in the URL. We are interested in ALL of the
higher education institutions available in Latvia (thus available on niid.lv
with the selected filters).

The layout for each information row can be found for each institution from the
aforementioned link,
[upon clicking on an institution](http://niid.lv/niid_search/provider/Ventspils%20Augstskola?qy=&ct=&tg=&level_1=8%7C9%7C7).

| name                 | abbr | location                                | website      |
| -------------------- | ---- | --------------------------------------- | ------------ |
| Ventspils Augstskola |      | Inženieru iela 101A, Ventspils, LV-3601 | www.venta.lv |

There are some caveats for such a layout:

1. `abbr` (abbreviation) cannot be determined from niid.lv website therefore it
   will be left empty.

## For development

1. Install `pipenv` on your local machine - https://pipenv.pypa.io/en/latest/
2. Open the terminal in this folder

   ```sh
   cd scripts/niid-web-scraper
   ```

3. Install pipenv dependencies

   ```sh
   pipenv install
   ```

4. Launch the terminal in pipenv environemnt

   ```sh
   pipenv shell
   ```
