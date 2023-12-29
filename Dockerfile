FROM node:16.3.0-alpine as base

WORKDIR /app

COPY package*.json .

RUN npm i

RUN npm i -g @nestjs/cli

COPY . .

ENTRYPOINT [ "" ]

