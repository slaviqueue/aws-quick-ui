FROM node:18-alpine3.19

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start"]
