FROM node:21 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --platform=linuxmusl

COPY . .

FROM node:21-alpine

RUN apk add --no-cache ffmpeg imagemagick libwebp

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

RUN addgroup -g 10014 choreo && \
    adduser --disabled-password --no-create-home --uid 10014 --ingroup choreo choreouser

USER 10014

EXPOSE 5000
CMD [ "npm", "start" ]
