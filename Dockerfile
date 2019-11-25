FROM node:8.11.3-alpine
WORKDIR /usr/src/app

COPY .jestrc.json \
     .sass-lint.yml \
     package.json \
     package-lock.json \
     tsconfig.json \
     tslint.json \
     ./
COPY app ./app
COPY config ./config

ARG auth
ARG registry

RUN npm config set registry ${registry}
RUN npm config set _auth ${auth}

RUN npm i
RUN npm run build

EXPOSE 8000
