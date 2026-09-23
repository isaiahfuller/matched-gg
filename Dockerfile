# syntax=docker/dockerfile:1
FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN yarn install --immutable

FROM dependencies AS backend-build
COPY backend ./backend
RUN yarn workspace @g4mr/backend build

FROM dependencies AS frontend-build
COPY frontend ./frontend
RUN yarn workspace @g4mr/frontend build

# Serve the built SPA and proxy same-origin API requests.
FROM nginx:stable-alpine AS frontend
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80

FROM node:22-bookworm-slim AS backend
ENV NODE_ENV=production
WORKDIR /app
COPY --from=backend-build --chown=node:node /app/node_modules ./node_modules
COPY --from=backend-build --chown=node:node /app/backend ./backend
WORKDIR /app/backend
# Resolve TypeScript aliases in emitted JavaScript, including src/* imports.
ENV TS_NODE_BASEURL=./dist
USER node
EXPOSE 3000 7331
CMD ["node", "-r", "tsconfig-paths/register", "dist/src/main.js"]
