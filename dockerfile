FROM node:14-alpine

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev"]
