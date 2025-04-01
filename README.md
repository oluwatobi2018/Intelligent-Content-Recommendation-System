# 📌 AI-Powered Content Recommendation Platform

## 🚀 Overview
This project is a SaaS-based intelligent content recommendation platform designed to help businesses deliver personalized content to users. The system enables data ingestion, user behavior analysis, AI-driven recommendations, and content management.

## 🏗️ Tech Stack
### **Frontend:**
- **Framework:** React (Next.js) with TypeScript
- **Styling:** TailwindCSS
- **State Management:** Redux / Context API
- **API Calls:** Axios / Fetch API
- **Deployment:** Vercel / AWS S3

### **Backend:**
- **Runtime:** Node.js with Express
- **Language:** TypeScript
- **Database:** PostgreSQL / MongoDB
- **Authentication:** JWT
- **Caching:** Redis
- **Background Jobs:** BullMQ (Redis-based queue)
- **AI/ML:** TensorFlow.js / Python (Flask/FastAPI)
- **Containerization:** Docker
- **Infrastructure-as-Code:** Terraform

## 📌 Features
### ✅ **Frontend**
- User-friendly content listing
- Tracks user behavior for personalized recommendations
- Responsive UI with analytics dashboard

### ✅ **Backend**
- RESTful APIs for content management & recommendations
- User authentication (JWT-based login & role-based access control)
- AI-powered recommendation system using collaborative filtering
- Optimized database schema for quick retrieval & scalability
- Implements Redis caching for high-speed performance
- Uses background jobs for heavy computation tasks

### ✅ **AI Recommendation Engine**
- Uses **Machine Learning** to personalize content suggestions
- Trains models based on user interactions & content engagement
- Supports real-time recommendations via API endpoints

### ✅ **Database Design**
- **Users Table:** Stores user details & preferences
- **Content Table:** Holds articles, images, links & metadata
- **Engagement Table:** Tracks user interactions for ML training
- **Logs Table:** Maintains event logs for monitoring
# Database Schema Documentation

## 🏛️ Entity-Relationship Diagram (ERD)

Below is an overview of the database schema:

```plaintext
+-------------------+       +------------------+       +--------------------+
|      Users       |       |    Content       |       |  User_Engagement   |
+-------------------+       +------------------+       +--------------------+
| id (UUID)        |-----> | id (UUID)        |       | id (UUID)          |
| name (STRING)    |       | title (STRING)   |<----- | user_id (UUID)     |
| email (STRING)   |       | type (ENUM)      |       | content_id (UUID)  |
| password (HASH)  |       | metadata (JSON)  |       | interaction (ENUM) |
+-------------------+       +------------------+       +--------------------+
```

## 📖 Schema Explanation

### **Users Table**
Stores user information and authentication details.

| Column     | Type    | Description |
|------------|---------|-------------|
| `id`       | UUID    | Unique identifier for the user |
| `name`     | STRING  | Full name of the user |
| `email`    | STRING  | Unique email address |
| `password` | HASH    | Securely hashed password |

### **Content Table**
Stores information about different types of content.

| Column    | Type    | Description |
|-----------|--------|-------------|
| `id`      | UUID   | Unique identifier for content |
| `title`   | STRING | Title of the content |
| `type`    | ENUM   | Content type (e.g., `article`, `video`, `image`) |
| `metadata`| JSON   | Additional content details |

### **User_Engagement Table**
Tracks user interactions with content for AI recommendations.

| Column       | Type    | Description |
|-------------|--------|-------------|
| `id`        | UUID   | Unique identifier for engagement |
| `user_id`   | UUID   | User who interacted with content |
| `content_id`| UUID   | Content that was interacted with |
| `interaction` | ENUM  | Type of interaction (`click`, `like`, `share`, `view`) |

## 🛠️ Migrations & Seeding

To set up the database schema, run the following commands:

```bash
# Run migrations to create tables
npx knex migrate:latest

# Seed initial data
npx knex seed:run
```

## 🔍 Query Examples

Fetch all users:
```sql
SELECT * FROM users;
```

Fetch user interactions with content:
```sql
SELECT users.name, content.title, user_engagement.interaction 
FROM user_engagement 
JOIN users ON users.id = user_engagement.user_id 
JOIN content ON content.id = user_engagement.content_id;
```

This section provides a clear structure and explanation for your database design.



## 🏗️ Deployment & CI/CD
- Uses **Docker** for containerization
- **GitHub Actions** for CI/CD automation
- **Kubernetes (K8s)** for scaling services
- **Terraform** for managing cloud infrastructure
- **Prometheus & Grafana** for monitoring
# **Deployment Guide: Kubernetes, Terraform, and Deployment Scripts**

This guide covers how to **deploy** the SaaS-based content recommendation platform using **Kubernetes (K8s), Terraform (IaC), and CI/CD pipelines** for seamless deployment.

---

## **1. Prerequisites**  
Ensure you have the following installed:  
✅ **Docker** (For containerization)  
✅ **Kubernetes CLI (kubectl)**  
✅ **Helm** (For managing K8s deployments)  
✅ **Terraform** (For infrastructure management)  
✅ **A cloud provider account** (AWS, GCP, or Azure)  
✅ **GitHub Actions/GitLab CI/CD** (For automation)  

---

## **2. Docker Setup**  
First, **containerize** the application.  

### **Step 1: Build Docker Images**  
Navigate to the **backend** and **frontend** directories:  

```bash
# Build Backend Docker Image
cd backend
docker build -t my-backend:latest .

# Build Frontend Docker Image
cd ../frontend
docker build -t my-frontend:latest .
```

### **Step 2: Run Containers Locally**  
```bash
docker run -p 5000:5000 my-backend
docker run -p 3000:3000 my-frontend
```

### **Step 3: Push to Docker Hub / Private Registry**  
```bash
# Authenticate with Docker
docker login -u <username> -p <password>

# Tag and Push Backend
docker tag my-backend <dockerhub_username>/my-backend:v1
docker push <dockerhub_username>/my-backend:v1

# Tag and Push Frontend
docker tag my-frontend <dockerhub_username>/my-frontend:v1
docker push <dockerhub_username>/my-frontend:v1
```

---

## **3. Kubernetes (K8s) Deployment**  
We will deploy the **backend**, **frontend**, and **database** to **Kubernetes**.

### **Step 1: Setup Kubernetes Cluster**  
If using **Minikube**, start the cluster:  
```bash
minikube start
```
For **AWS EKS, GCP GKE, or Azure AKS**, create a cluster using the cloud console or CLI.

### **Step 2: Apply K8s Configurations**  
In the **k8s/** directory, create the necessary YAML files:  

📌 **frontend-deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: <dockerhub_username>/my-frontend:v1
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

📌 **backend-deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: <dockerhub_username>/my-backend:v1
        env:
        - name: DATABASE_URL
          value: "postgres://user:password@db-service:5432/db_name"
        ports:
        - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
  type: ClusterIP
```

### **Step 3: Deploy to Kubernetes**  
Apply the configurations:  
```bash
kubectl apply -f k8s/
```

Verify deployments:  
```bash
kubectl get pods
kubectl get services
```

---

## **4. Infrastructure as Code with Terraform**  
Use **Terraform** to manage cloud resources like databases, Kubernetes clusters, and storage.

📌 **terraform/main.tf**
```hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_eks_cluster" "my_cluster" {
  name     = "my-k8s-cluster"
  role_arn = aws_iam_role.eks_role.arn
  vpc_config {
    subnet_ids = aws_subnet.public[*].id
  }
}

resource "aws_rds_instance" "postgres" {
  identifier            = "mydb-instance"
  engine               = "postgres"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  username            = "admin"
  password            = "password"
  publicly_accessible = false
}
```

### **Deploy using Terraform**  
```bash
terraform init
terraform apply -auto-approve
```

---

## **5. CI/CD with GitHub Actions**  
📌 **.github/workflows/deploy.yml**
```yaml
name: Deploy to Kubernetes
on:
  push:
    branches:
      - main
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Kubernetes
        uses: azure/setup-kubectl@v3

      - name: Deploy to K8s
        run: |
          kubectl apply -f k8s/
          kubectl rollout status deployment/backend
          kubectl rollout status deployment/frontend
```

Push changes to **GitHub**, and the workflow will **auto-deploy** the application.

---

## **6. Monitoring & Scaling**  
For **logging & monitoring**, use **Prometheus and Grafana**.

📌 **Install Prometheus on Kubernetes**  
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
```

📌 **Install Grafana**  
```bash
helm install grafana grafana/grafana
```

Check running services:  
```bash
kubectl get pods -n monitoring
kubectl get svc -n monitoring
```

---

## **7. Accessing the Application**  
Find the **LoadBalancer IP**:  
```bash
kubectl get svc frontend-service
```
Visit:  
```
http://<LOADBALANCER_IP>
```

---

## **Conclusion**  
✅ **Dockerized the app**  
✅ **Deployed to Kubernetes**  
✅ **Used Terraform for cloud resources**  
✅ **Set up CI/CD for automation**  
✅ **Integrated monitoring with Prometheus & Grafana**  

🚀 **The application is now fully deployed!** 🚀


## 🔑 Environment Variables (.env)
### **Backend (.env)**
```plaintext
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/database
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
```
### **Frontend (.env.local)**
```plaintext
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RECOMMENDATION_API=http://localhost:5000/recommendations
```

## 🚀 How to Run the Project
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo-name.git
cd project-folder
```

### **2️⃣ Install Dependencies**
```sh
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### **3️⃣ Setup the Database**
```sh
# Run database migrations
cd backend
yarn knex migrate:latest
```

### **4️⃣ Start the Application**
```sh
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

## 📖 API Documentation (Swagger)
The API documentation is available at:
```sh
http://localhost:5000/api-docs
```
# API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication

### 1. User Registration
**Endpoint:**
```
POST /auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here"
}
```

### 2. User Login
**Endpoint:**
```
POST /auth/login
```
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

## Content Management

### 3. Create Content
**Endpoint:**
```
POST /content
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Request Body:**
```json
{
  "title": "AI in SaaS",
  "body": "Exploring AI-powered recommendations.",
  "tags": ["AI", "SaaS", "Tech"]
}
```
**Response:**
```json
{
  "message": "Content created successfully",
  "contentId": "12345"
}
```

### 4. Fetch All Content
**Endpoint:**
```
GET /content
```
**Response:**
```json
[
  {
    "id": "12345",
    "title": "AI in SaaS",
    "body": "Exploring AI-powered recommendations.",
    "tags": ["AI", "SaaS", "Tech"],
    "createdAt": "2025-03-27T12:00:00Z"
  }
]
```

### 5. Update Content
**Endpoint:**
```
PUT /content/{id}
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Request Body:**
```json
{
  "title": "Updated AI in SaaS",
  "body": "Updated content details.",
  "tags": ["AI", "Machine Learning"]
}
```
**Response:**
```json
{
  "message": "Content updated successfully"
}
```

### 6. Delete Content
**Endpoint:**
```
DELETE /content/{id}
```
**Headers:**
```
Authorization: Bearer jwt_token_here
```
**Response:**
```json
{
  "message": "Content deleted successfully"
}
```

## User Behavior Tracking

### 7. Track User Interaction
**Endpoint:**
```
POST /user/interaction
```
**Request Body:**
```json
{
  "userId": "67890",
  "contentId": "12345",
  "interactionType": "like"
}
```
**Response:**
```json
{
  "message": "Interaction recorded successfully"
}
```

## AI Recommendation Engine

### 8. Get Personalized Recommendations
**Endpoint:**
```
GET /recommendations/{userId}
```
**Response:**
```json
{
  "recommendations": [
    {
      "id": "67890",
      "title": "AI and Future Trends",
      "tags": ["AI", "Future"]
    }
  ]
}
```

## Analytics

### 9. Get Content Performance Analytics
**Endpoint:**
```
GET /analytics/content
```
**Response:**
```json
{
  "totalViews": 1000,
  "topContent": [
    {
      "id": "12345",
      "title": "AI in SaaS",
      "views": 500
    }
  ]
}
```

## AI Model Architecture and Training Process
## 1. Overview
The AI recommendation engine is designed to provide personalized content recommendations by analyzing user interactions, content metadata, and behavioral patterns. It employs a hybrid recommendation approach that combines collaborative filtering and content-based filtering for enhanced accuracy.

## 2. Model Architecture
The AI system consists of the following key components:

## A. Data Collection & Preprocessing
User Data: Tracks user interactions, clicks, likes, and engagement metrics.

## Content Data: 
Stores metadata such as categories, keywords, timestamps, and user-generated tags.

## Behavioral Data: Analyzes browsing history, session duration, and user preferences.

Data is preprocessed using:

Normalization (scaling features)

Tokenization & Embeddings (for text-based content)

Missing Data Handling (imputation strategies)

## B. Recommendation Algorithms
The system employs a hybrid model combining:

Collaborative Filtering (CF)

Uses Matrix Factorization (Singular Value Decomposition - SVD) for user-item interaction matrix.

Example: If User A and User B have similar interaction patterns, recommend items liked by User B to User A.

Content-Based Filtering

Uses TF-IDF (Term Frequency-Inverse Document Frequency) and Word2Vec embeddings for text similarity.

Computes cosine similarity between content features to recommend similar items.

Hybrid Recommendation Model

Weighted Approach: Combines scores from both CF and Content-Based Filtering.

Ensemble Learning: Uses a meta-learning model (e.g., a Neural Network) to blend multiple recommendation signals.

## 3. Model Training & Optimization
Training Dataset: Uses real-world user engagement data (e.g., past interactions, ratings, browsing history).

Training Process:

Splits dataset into training (80%) and testing (20%).

Uses Mini-batch Stochastic Gradient Descent (SGD) for optimization.

Applies Regularization (L2) to prevent overfitting.

Performs Hyperparameter Tuning (learning rate, batch size, embedding dimensions).

Evaluation Metrics:

Precision@K (accuracy of top-K recommendations)

Recall@K (coverage of relevant items in recommendations)

Mean Squared Error (MSE) for rating predictions

Normalized Discounted Cumulative Gain (NDCG) for ranking relevance

## 4. Deployment
Batch Inference: Periodic re-training and updating recommendation scores in a Redis cache.

Real-Time API: Fast predictions using a Flask/FastAPI microservice.

Scalability:

Uses Redis caching for fast retrieval.

Deployed on Kubernetes with auto-scaling.

Vercel Deployment URL: ![image](https://github.com/user-attachments/assets/c4207358-87f9-46ce-a83b-f36df0d83ad8)
https://vercel.com/oluwatobichris88gmailcoms-projects/intelligent-content-recommendation-system


## 5. Future Improvements
Deep Learning-based models: Implement Transformer-based BERT4Rec for sequential recommendations.

Graph-Based Models: Utilize Graph Neural Networks (GNNs) for advanced user-content relationships.

A/B Testing: Continuously test new models in production to optimize engagement.
## Error Handling

All error responses follow this format:
```json
{
  "error": "Error message here"
}
```

## Security Measures
- JWT Authentication for secured endpoints.
- Data validation and sanitization.
- Rate limiting to prevent abuse.

## Testing Coverage
We use **Jest** and **Supertest** for testing.

### Running Tests
```sh
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration
```

### Testing Features
- **Unit Tests**: Ensure individual components work as expected.
- **Integration Tests**: Validate interactions between services.
- **Mocking & Stubbing**: Simulate external dependencies for reliable tests.

  # Advanced Logging & Monitoring

## Overview
To ensure system reliability, track performance, and detect anomalies, we integrate advanced logging and monitoring using **Winston** for logging and **Prometheus & Grafana** for monitoring.

---

## 1. Logging with Winston

### Install Winston
```sh
npm install winston
```

### Create a Logger Utility
**File:** `backend/src/utils/logger.js`
```js
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

export default logger;
```

### Implement Logger in API
Modify **middleware/requestLogger.js**:
```js
import logger from "../utils/logger";

export const requestLogger = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
};
```

Use in `backend/src/routes/index.js`:
```js
import { requestLogger } from "../middleware/requestLogger";
router.use(requestLogger);
```

---

## 2. Monitoring with Prometheus & Grafana

### Install Prometheus Client
```sh
npm install prom-client
```

### Create a Metrics Middleware
**File:** `backend/src/middleware/metrics.js`
```js
import client from "prom-client";
import express from "express";

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const metricsRouter = express.Router();

metricsRouter.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

export default metricsRouter;
```

Use in `backend/src/app.js`:
```js
import metricsRouter from "./middleware/metrics";
app.use("/monitoring", metricsRouter);
```

---

## 3. Setting Up Grafana & Prometheus

### Step 1: Create Prometheus Configuration
**File:** `prometheus.yml`
```yaml
scrape_configs:
  - job_name: 'node_app'
    static_configs:
      - targets: ['localhost:5000']
```

### Step 2: Run Prometheus & Grafana with Docker
**File:** `docker-compose.yml`
```yaml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

### Step 3: Start the Services
```sh
docker-compose up -d
```

### Step 4: Access the Monitoring Tools
- **Prometheus:** `http://localhost:9090`
- **Grafana:** `http://localhost:3000`

---

## 4. Visualizing Metrics in Grafana
1. Log in to **Grafana** (`admin/admin` by default).
2. Add **Prometheus** as a data source (`http://prometheus:9090`).
3. Create a **dashboard** and add visualizations for request count, error rates, and response times.
---
This documentation provides a structured overview of the API endpoints, request/response examples, and authentication details. 

## 🛠️ Additional Enhancements
- ✅ **Improved AI model accuracy** with user-based collaborative filtering
- ✅ **Optimized API response times** with caching & indexing
- ✅ **Added background job processing** for resource-intensive tasks
- ✅ **Implemented Prometheus & Grafana** for real-time monitoring
- ✅ **Cloud-enabled with Terraform & Kubernetes** for scalability

---
📌 **Maintained by:** Oluwatobi Adeogun
📌 **License:** MIT License
📌 **Contributors Welcome!** Feel free to open a PR!

