FROM node:16-alpine3.14

ADD ["./package.json", "/package.json"]
ADD ["./src", "./src"]

RUN yarn
RUN yarn:build

RUN rm -rf ./node_modules ./yarn.lock

RUN yarn install --ignore-engines --production=true
RUN find ./node_modules -mtime +10950 -exec touch {} +

RUN chmod 777 /dist
RUN chmod 777 /dist/*
RUN chmod 777 /package.json

