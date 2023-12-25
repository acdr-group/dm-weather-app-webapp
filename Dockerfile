# ENVIRONMENT VARS
ARG NODE_VERSION=21.1.0

# STAGE 1: BUILDER
FROM node:${NODE_VERSION}-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: RUNNER
FROM node:${NODE_VERSION}-alpine as runnner
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public .
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENTRYPOINT ["node", "server.js"]