# Name the node stage "builder"
FROM node:alpine AS builder
# Set working directory
WORKDIR /nuxtapp
# Copy all files from current directory to working dir in image
COPY . .

RUN npm install -g pnpm
# install node modules and build assets

COPY .env.example .env

RUN pnpm install 
RUN pnpm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", ".output/server/index.mjs" ]
