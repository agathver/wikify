FROM mhart/alpine-node:4
# FROM mhart/alpine-node

ADD . /app
WORKDIR /app

#ADD run.sh run.sh
#RUN chmod +x run.sh

EXPOSE 8080
ENV PORT 8080

#CMD ["start"]
#ENTRYPOINT ["/bin/sh","-c","run.sh"]
#CMD ["ls","-lha"]
#CMD ["pwd"]
#ADD . .

# If you have native dependencies, you'll need extra tools
#RUN apk add make gcc g++ python

# If you need npm, don't use a base tag
#RUN npm install
#RUN npm install -g forever

CMD ["node","app.js"]
