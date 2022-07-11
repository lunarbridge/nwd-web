FROM node:16.16.0-slim

ARG APP_DIR='/app'

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY package* $APP_DIR/
RUN npm install

COPY . .

RUN npm run build:dev
RUN npm install -g serve

ENV EXPOSE_PORT=5000
ENV NODE_ENV=dev

EXPOSE $EXPOSE_PORT
CMD serve -s ./build -p $EXPOSE_PORT