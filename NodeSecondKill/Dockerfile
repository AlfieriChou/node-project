#Dockerfile文件
FROM docker.io/node

# Create app directory
RUN mkdir -p /home/secKill
WORKDIR /home/secKill

# Bundle app source
COPY . /home/secKill

RUN npm install

EXPOSE 4000

CMD [ "npm", "start" ]
