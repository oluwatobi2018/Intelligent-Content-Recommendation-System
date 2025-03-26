DevOps Guide for Multi-Service Application Deployment
This document provides comprehensive instructions for setting up, deploying, and managing a multi-service application comprising a Next.js frontend, Express.js backend, FastAPI AI engine, and a PostgreSQL database. The deployment process utilizes Docker, Docker Compose, and GitHub Actions for Continuous Integration and Continuous Deployment (CI/CD).

Prerequisites
Ensure the following tools are installed on your system:

Docker

Docker Compose

Node.js (for local development)

Python (for local development)

GitHub CLI (optional, for managing GitHub Actions)

Project Structure
The repository is organized as follows:

bash
Copy
Edit
your-repo/
├── frontend/               # Next.js application
│   └── Dockerfile
├── backend/                # Express.js application
│   └── Dockerfile
├── ai-engine/              # FastAPI application
│   └── Dockerfile
├── devops/
│   ├── deploy.sh           # Deployment script
│   └── .github/
│       └── workflows/      # GitHub Actions workflows
│           ├── frontend-ci.yml
│           ├── backend-ci.yml
│           └── ai-engine-ci.yml
├── docker-compose.yml      # Docker Compose configuration
└── README.md
Docker Compose Configuration
The docker-compose.yml file orchestrates the services, defining how they interact and are deployed together.

yaml
Copy
Edit
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    depends_on:
      - ai-engine
      - db
    environment:
      - AI_ENGINE_URL=http://ai-engine:8000
      - DATABASE_URL=postgresql://user:password@db:5432/dbname
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    networks:
      - app-network

  ai-engine:
    build:
      context: ./ai-engine
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    volumes:
      - ./ai-engine:/app
    networks:
      - app-network

  db:
    image: postgres:13
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: dbname
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  postgres_data:
Key Points:

Services:

frontend: Builds and serves the Next.js application on port 3000.

backend: Sets up the Express.js server on port 5000, connecting to the AI engine and database.

ai-engine: Runs the FastAPI application on port 8000.

db: Deploys a PostgreSQL 13 database on port 5432 with persistent storage.

Networks: All services communicate over the app-network bridge network.

Volumes: Persistent storage is configured for the PostgreSQL database to retain data across container restarts.

Deployment Script
The deploy.sh script automates the deployment process using Docker Compose.

bash
Copy
Edit
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
Usage:

Ensure the script has execution permissions:

bash
Copy
Edit
chmod +x devops/deploy.sh
Execute the deployment script:

bash
Copy
Edit
./devops/deploy.sh
This script pulls the latest images, builds the services, and starts them in detached mode, providing a streamlined deployment process.

Continuous Integration with GitHub Actions
GitHub Actions workflows automate the build and test processes for each component. The workflows are defined in the .github/workflows/ directory.

Frontend CI (frontend-ci.yml)
Automates testing and building of the Next.js application.

yaml
Copy
Edit
name: Frontend CI

on:
  push:
    paths:
      - 'frontend/**'
  pull_request:
    paths:
      - 'frontend/**'

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: frontend
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test

      - name: Build Application
        run: npm run build
Backend CI (backend-ci.yml)
Handles testing of the Express.js backend.

yaml
Copy
Edit
name: Backend CI

on:
  push:
    paths:
      - 'backend/**'
  pull_request:
    paths:
      - 'backend/**'

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: backend
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test
AI Engine CI (ai-engine-ci.yml)
Manages testing of the FastAPI AI engine.

yaml
Copy
Edit
name: AI Engine CI

on:
  push:
    paths:
      - 'ai-engine/**'
  pull_request:
    paths:
      - 'ai-engine/**'

jobs:
  build-and-test:
    runs-on: ubuntu
::contentReference[oaicite:0]{index=0}
 







