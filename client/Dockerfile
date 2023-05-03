FROM node:alpine

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
COPY . /app

RUN npm install

CMD ["npm", "start"]