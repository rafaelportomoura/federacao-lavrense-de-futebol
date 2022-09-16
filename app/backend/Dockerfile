FROM node:16-alpine3.14

WORKDIR /home/node/.ssh

RUN apk add --no-cache openssh
RUN ssh-keygen -q -t rsa -b 4096 -f /home/node/.ssh/id_rsa

RUN chmod a+r /home/node/.ssh/id_rsa

WORKDIR /home/node/app