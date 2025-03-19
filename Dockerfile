FROM node:23.10.0-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

EXPOSE 3000

# Run the application
CMD ["node", "src/index.js"]