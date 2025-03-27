#!/bin/bash

set -e  # Exit on error
set -o pipefail  # Catch pipeline errors
set -u  # Treat unset variables as errors

# Define the Docker Compose file
COMPOSE_FILE="docker-compose.yml"

echo "🚀 Starting Deployment Process..."

# Ensure Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker and try again."
  exit 1
fi

# Pull the latest images
echo "📦 Pulling the latest images..."
docker-compose -f $COMPOSE_FILE pull

# Build the services
echo "🔧 Building the services..."
docker-compose -f $COMPOSE_FILE build --no-cache

# Stop running containers (if any)
echo "🛑 Stopping existing containers..."
docker-compose -f $COMPOSE_FILE down

# Clean up unused Docker resources
echo "🧹 Cleaning up old containers and images..."
docker system prune -af --volumes

# Start the services in detached mode
echo "🚀 Starting the services..."
docker-compose -f $COMPOSE_FILE up -d --remove-orphans

# Wait for containers to stabilize
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check running services
echo "📊 Checking service status..."
docker-compose -f $COMPOSE_FILE ps

# Display logs (optional)
echo "📜 Fetching latest logs..."
docker-compose -f $COMPOSE_FILE logs --tail=20

echo "✅ Deployment completed successfully!"

