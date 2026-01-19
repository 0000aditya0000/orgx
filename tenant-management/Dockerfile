FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 4201

CMD ["npm", "start"]
