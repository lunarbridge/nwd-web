FROM node:16.16.0-slim

ARG APP_DIR='/app'

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package* $APP_DIR/
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "./bin/www"]