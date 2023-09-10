FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install

COPY docker_env/frontend.env ./

COPY . .

RUN npm run build

EXPOSE 80

CMD [ "npm", "start" ]
