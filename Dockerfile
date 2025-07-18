FROM node:20.10.0-slim as node

WORKDIR /app

ARG TARGET
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_API_DOMAIN

ENV TARGET=$TARGET
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN

COPY ./src ./src
COPY ./public ./public
COPY ./next-env.d.ts ./next-env.d.ts
COPY ./package.json ./package.json
COPY ./next.config.js ./next.config.js
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.spec.json ./tsconfig.spec.json
COPY ./tailwind.config.js ./tailwind.config.js 
COPY ./postcss.config.js ./postcss.config.js

RUN set -x && \
    apt clean && \
    apt update && \
    apt install -y --no-install-recommends \
    ca-certificates
RUN set -x && \
    update-ca-certificates

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

COPY . .

EXPOSE 3000

CMD [ "pnpm", "start" ]
