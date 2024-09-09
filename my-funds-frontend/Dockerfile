FROM node:22 as build
WORKDIR /app
COPY ./my-funds-frontend/package*.json .
RUN npm ci
COPY ./my-funds-frontend/public ./public
COPY ./my-funds-frontend/src ./src
COPY ./vars ./vars
RUN npm run build

FROM nginx:stable-alpine
COPY ./my-funds-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]