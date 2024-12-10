# The base image for the builder stage
ARG NODE_VERSION=20-bullseye-slim
FROM node:$NODE_VERSION AS builder

ENV APP=/usr/app

WORKDIR $APP

COPY package.json tsconfig*.json yarn.lock $APP/

# Install Dependencies
RUN yarn --immutable

## Copy Application Code
COPY . .

RUN yarn build

FROM nginx:alpine3.20 AS runner

COPY --from=builder /usr/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]