FROM alpine:3.16.2 AS base

RUN apk add --no-cache npm git openssh

WORKDIR /home/node/

COPY package.json package-lock-json* ./

RUN npm install --omit=optional && npm cache clean --force

ENV PATH /home/node/node_modules/.bin:$PATH

WORKDIR /home/node/app

COPY . .

RUN git config --global --add safe.directory /home/node/app

ENTRYPOINT ["npm"]

FROM base AS dev

RUN npm install -g typescript ts-node
