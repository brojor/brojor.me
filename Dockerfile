# Build Stage 1

FROM node:22 AS build
WORKDIR /app

# Accept build args
ARG NUXT_PUBLIC_SITE_NAME
ARG NUXT_PUBLIC_BASE_URL
ARG NUXT_PUBLIC_UMAMI_HOST
ARG NUXT_PUBLIC_UMAMI_ID

# Set as environment variables for build
ENV NUXT_PUBLIC_SITE_NAME=$NUXT_PUBLIC_SITE_NAME
ENV NUXT_PUBLIC_BASE_URL=$NUXT_PUBLIC_BASE_URL
ENV NUXT_PUBLIC_UMAMI_HOST=$NUXT_PUBLIC_UMAMI_HOST
ENV NUXT_PUBLIC_UMAMI_ID=$NUXT_PUBLIC_UMAMI_ID

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

# Build Stage 2

FROM node:22
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD ["node", "/app/server/index.mjs"]
