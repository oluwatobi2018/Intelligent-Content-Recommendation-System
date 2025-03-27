# Database Documentation

## Overview
This directory contains the database schema, seed data, and configuration files for the Intelligent Content Recommendation platform. It ensures efficient data storage, retrieval, and management.

## Database Choice
- **Database Type:** PostgreSQL / MongoDB (choose based on the project requirements)
- **Purpose:** Stores content, user profiles, interactions, and recommendation data.

## Structure
```
```
## Setup Instructions
### PostgreSQL Setup
1. Install PostgreSQL if not already installed.
2. Create a new database:
   ```sh
   createdb content_recommendation
   ```
3. Run the schema setup:
   ```sh
   psql -d content_recommendation -f schema.sql
   ```
4. Seed the database (if applicable):
   ```sh
   node seed.js
   ```

### MongoDB Setup
1. Install MongoDB and start the service.
2. Create a new database:
   ```sh
   use content_recommendation
   ```
3. Insert seed data:
   ```sh
   node seed.js
   ```

## Migrations
- Migrations are used to keep the database schema up to date.
- Use a migration tool like `knex.js` (PostgreSQL) or `migrate-mongo` (MongoDB) to manage changes.
- Example command to apply migrations:
  ```sh
  knex migrate:latest  # For PostgreSQL
  migrate-mongo up     # For MongoDB
  ```

## Configuration
Database connection settings are stored in `config.ts`:
```ts
export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'content_recommendation',
};
```
Make sure to set up a `.env` file with appropriate values.

## Best Practices
- Always use migrations for schema changes.
- Secure database credentials using environment variables.
- Regularly back up the database.
- Optimize queries for performance.

## Additional Notes
For any database-related troubleshooting, check the logs and ensure the database service is running correctly.

