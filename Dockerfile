# Build stage
FROM node:23.10.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json .

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# If there's a build step, uncomment and adjust the following line
# RUN npm run build

# Production stage
FROM node:23.10.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/src ./src

# Copy any other necessary files (uncomment as needed)
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/public ./public

EXPOSE 3000

# Run the application
CMD ["node", "src/index.js"]