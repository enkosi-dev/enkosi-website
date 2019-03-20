#!/bin/bash

version=0.0.1

# Dev deploy
docker build -t enkosi-site:$version .
docker run -d -p 8080:80 enkosi-site:$version