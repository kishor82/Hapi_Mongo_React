FROM node:12.14.0-slim
WORKDIR /app
COPY ["package.json","yarn.lock","preinstall_check.js","/app/"]
RUN yarn install
COPY . /app
RUN yarn build:prod
CMD ["yarn","start"]

