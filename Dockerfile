FROM node:0.11.15

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD [ "node" ,  "." ]