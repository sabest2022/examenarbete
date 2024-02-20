FROM node

WORKDIR /client

COPY package*.json /client/

RUN npm install --legacy-peer-deps

COPY . /client/

EXPOSE 5173

CMD [ "npm", "run", "dev" ]