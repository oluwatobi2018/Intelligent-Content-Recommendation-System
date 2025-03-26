1. Prerequisites
Ensure you have the following installed on your system:

✅ PostgreSQL
✅ Node.js & npm/yarn
✅ Required Node.js packages: pg, dotenv




2. Install PostgreSQL
If you haven't installed PostgreSQL yet, follow these steps:

Windows
Download and install PostgreSQL from here.

During installation, set up a password for the Postgres superuser.

Open pgAdmin or the PostgreSQL Shell (psql) to manage databases.
Mac
brew install postgresql
brew services start postgresql

Linux (Ubuntu/Debian)
sh
Copy
Edit
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
🏛 3. Create a PostgreSQL Database
Open psql (PostgreSQL shell) and run:

sql
Copy
Edit
CREATE DATABASE content_recommendation;
To verify:

sql
Copy
Edit
\l  -- List all databases
Alternatively, you can create the database using pgAdmin.

🔑 4. Configure Environment Variables
Create a .env file in your project root with the following details:

ini
Copy
Edit
DB_USER=your_username
DB_HOST=localhost
DB_NAME=content_recommendation
DB_PASSWORD=your_password
DB_PORT=5432
🛠 5. Set Up Database Schema
Run the following command to apply the database schema:

sh
Copy
Edit
psql -U your_username -d content_recommendation -f database/schema.sql
OR open schema.sql, copy the SQL script, and execute it in pgAdmin.

🌱 6. Seed the Database (Optional)
To populate the database with sample data, run:

sh
Copy
Edit
node database/seed.js
🔌 7. Connect Your Backend to PostgreSQL
Install Required Packages:
sh
Copy
Edit
npm install pg dotenv
Use config.ts for Database Connection:
Create database/config.ts:

typescript
Copy
Edit
import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
  console.log("✅ Connected to the PostgreSQL database.");
});

export default pool;
🚀 8. Running the Backend with Database
Once everything is set up, start your backend server:

sh
Copy
Edit
npm run dev
If using Docker, ensure PostgreSQL is running inside a container.

🛑 9. Troubleshooting
Error: psql: command not found?

Ensure PostgreSQL is installed and added to your system’s PATH.

Connection refused?

Verify PostgreSQL is running:

sh
Copy
Edit
sudo systemctl status postgresql  # For Linux
brew services list                 # For Mac
Check credentials in .env.

Port 5432 already in use?

Run sudo lsof -i :5432 to find and stop the conflicting process.
