FROM node:18-alpine as base

WORKDIR /app
COPY . .
RUN npm install -g typescript
RUN npm install -g ts-node
RUN yarn install

WORKDIR /app/server

EXPOSE 5000
EXPOSE 5001

ENTRYPOINT [ "ts-node", "src/index.ts"]
