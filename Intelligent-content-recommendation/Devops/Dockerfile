# 🏗 Base Stage: Install Dependencies
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# 📦 Final Stage: Minimal Production Image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependencies from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app ./

# Set a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
