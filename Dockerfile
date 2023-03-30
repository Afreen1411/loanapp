FROM node:latest


WORKDIR /
COPY package.json .
RUN npm install
# RUN npm start


WORKDIR /app

COPY . . 
CMD ["npm", "start"]

