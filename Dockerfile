FROM node:15.14.0-alpine@sha256:6edd37368174c15d4cc59395ca2643be8e2a1c9846714bc92c5f5c5a92fb8929 AS builder

COPY --chown=node:node package*.json /home/node/app/
WORKDIR /home/node/app
RUN npm install
#RUN ./scripts/generate-key-pair-for-dev.sh

FROM node:15.14.0-alpine@sha256:6edd37368174c15d4cc59395ca2643be8e2a1c9846714bc92c5f5c5a92fb8929

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
ARG PORT=3000
ENV PORT ${PORT}

WORKDIR /home/node/app
COPY --chown=node:node --from=builder /home/node/app .

COPY . /home/node/app
RUN npm run build

RUN chown node:node /home/node/app

USER node
EXPOSE $PORT
CMD ["node", "app.js"]

