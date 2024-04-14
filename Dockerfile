FROM sitespeedio/node:ubuntu-20.04-nodejs-18.16.0

RUN mkdir /app

WORKDIR /app

COPY src /app/src
COPY lib /app/lib
COPY node_modules /app/node_modules
COPY package.json /app/package.json

CMD ["npm", "start"]