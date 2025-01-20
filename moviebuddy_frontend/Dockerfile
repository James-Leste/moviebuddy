FROM node:18-alpine

WORKDIR /frontend

COPY package.json .

RUN npm i -y

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]