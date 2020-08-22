# pull official base image
FROM python:3.8-buster

# set work directory
WORKDIR /srv/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .

# --------------------------
# As per the officioal docs

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
RUN apt-get update
# --------------------------


RUN apt-get -y install postgresql-12 postgresql-client
RUN apt-get -y install python3-dev libpq-dev
RUN pip install -r requirements.txt


RUN apt-get -y install netcat
# copy entrypoint.sh
COPY ./entrypoint.sh .

# copy project
COPY . .

# run entrypoint.sh
ENTRYPOINT ["/srv/app/entrypoint.sh"]
