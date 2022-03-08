FROM node

COPY dist ./dist
COPY app.js ./

COPY package*.json ./

RUN  npm install --registry=https://registry.npm.taobao.org

EXPOSE 80
CMD ["node", "app"]
