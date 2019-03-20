FROM nginx:1.11.3

MAINTAINER Mandla Moyo "mandla.moyo@enkosi.com"

RUN rm /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/

RUN rm /etc/nginx/conf.d/default.conf

COPY enkosi.dev.conf /etc/nginx/conf.d/enkosi.conf

COPY src /usr/share/nginx/html