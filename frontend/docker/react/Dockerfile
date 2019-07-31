FROM ubuntu:18.04

COPY . /srv/www/fias_front
WORKDIR /srv/www/fias_front

RUN apt-get -y update
RUN apt -y install nodejs
RUN apt -y install npm
RUN npm i
