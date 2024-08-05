FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM node:21-alpine

RUN apk add --no-cache ffmpeg imagemagick libwebp

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

EXPOSE 5000
CMD [ "npm", "start" ]
