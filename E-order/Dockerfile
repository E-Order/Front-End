FROM node

RUN mkdir -p /home/service
WORKDIR /home/service

# Bundle app source
COPY . /home/service
RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
