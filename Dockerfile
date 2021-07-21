FROM node:12-alpine as builder

RUN mkdir /code
WORKDIR /code

COPY package*.json ./

RUN npm ci

COPY . ./
RUN npm run build

FROM node:12-alpine

ARG NODE_ENV

RUN apk update && apk upgrade && apk add bash

RUN mkdir /code
WORKDIR /code

COPY . ./
RUN rm -rf src

COPY --from=builder /code/dist ./dist/

RUN npm ci --production

CMD npm run start:dist
