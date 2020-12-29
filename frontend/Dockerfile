FROM node:latest AS build
COPY package.json /usr/angular-workdir/
WORKDIR /usr/angular-workdir
RUN npm install

COPY ./ /usr/angular-workdir
RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build  /usr/angular-workdir/dist/frontend /usr/share/nginx/html

##COPY dist/frontend usr/share/nginx/html
