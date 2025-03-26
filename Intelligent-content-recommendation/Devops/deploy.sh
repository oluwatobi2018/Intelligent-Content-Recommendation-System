#!/bin/bash

# Define the Docker Compose file
COMPOSE_FILE="docker-compose.yml"

# Pull the latest images
echo "Pulling the latest images..."
docker-compose -f $COMPOSE_FILE pull

# Build the services
echo "Building the services..."
docker-compose -f $COMPOSE_FILE build

# Start the services in detached mode
echo "Starting the services..."
docker-compose -f $COMPOSE_FILE up -d

# Optional: Display the status of the services
echo "Checking the status of the services..."
docker-compose -f $COMPOSE_FILE ps

echo "Deployment completed successfully."
