#Dockerfile文件
FROM docker.io/node

# Create app directory
RUN mkdir -p /home/blockChain
WORKDIR /home/blockChain

# Bundle app source
COPY . /home/blockChain

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
