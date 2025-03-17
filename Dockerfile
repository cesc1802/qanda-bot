# Build stage
ARG NODE_VERSION=23.10.0
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && \
    npm install -g pm2

# Runtime stage
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=builder /usr/local/bin/pm2 /usr/local/bin/pm2

# Copy application files
COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]