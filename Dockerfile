FROM node:14.4
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY *.js ./
CMD ["npm", "start"]