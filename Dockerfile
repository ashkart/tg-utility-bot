FROM node:20.12.2-alpine

RUN mkdir /app

WORKDIR /app

COPY src /app/src
COPY node_modules /app/node_modules
COPY package.json /app/package.json

EXPOSE 3151

CMD ["npm", "start"]