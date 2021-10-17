FROM node:16-alpine3.11 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@4.0.3 -g
COPY . ./

#This is the least complicated way to inject
#env variables to a react app, yet it is not
#the safest one. One day it has to be fixed.
ARG REACT_APP_BACK_BASE_URL
ENV REACT_APP_BACK_BASE_URL $REACT_APP_BACK_BASE_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_GOOGLE_CLIENT_ID $REACT_APP_GOOGLE_CLIENT_ID

RUN npm run build
CMD ["npm", "start"]

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]