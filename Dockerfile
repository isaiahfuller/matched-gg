FROM node:20-alpine AS base
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml* ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

RUN yarn install

# --- Stage 2: Builder Stage ---
FROM base AS builder
WORKDIR /usr/src/app

# Copy the rest of the monorepo source files
COPY . .

# Build the specific workspace application (if compilation is required)
RUN ls -la node_modules/dotenv || echo "DOTENV IS MISSING FROM CONTAINER RUNTIME!"
RUN yarn --cwd backend drizzle-kit generate
RUN yarn build


# --- Stage 3: Runner Stage ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN corepack enable

COPY --from=builder /usr/src/app/.yarnrc.yml* ./
COPY --from=builder /usr/src/app/.yarn/ ./.yarn/
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/backend ./backend
COPY --from=builder /usr/src/app/frontend ./frontend

RUN yarn install --immutable
# RUN yarn build

EXPOSE 3000
EXPOSE 7331
EXPOSE 4468

CMD ["yarn", "start:prod"]
