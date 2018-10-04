#Dockerfile文件
FROM docker.io/node

# Create app directory
RUN mkdir -p /home/test
WORKDIR /home/test

# Bundle app source
COPY . /home/test

RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]