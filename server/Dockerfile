FROM node:20
WORKDIR /server
COPY package*.json .
RUN npm i
COPY . .
EXPOSE 3001
CMD ["npm", "start"]