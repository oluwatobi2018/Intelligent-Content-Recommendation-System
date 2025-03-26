const { Pool } = require("pg");

// Database connection configuration
const pool = new Pool({
  user: "your_username",
  host: "localhost",
  database: "content_recommendation",
  password: "your_password",
  port: 5432, // Default PostgreSQL port
});

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding database...");

    // Insert users
    await pool.query(`
      INSERT INTO users (email, password_hash, full_name)
      VALUES 
      ('john.doe@example.com', 'hashed_password_123', 'John Doe'),
      ('jane.smith@example.com', 'hashed_password_456', 'Jane Smith')
      ON CONFLICT (email) DO NOTHING;
    `);

    // Insert content
    await pool.query(`
      INSERT INTO content (title, description, image_url, link)
      VALUES 
      ('AI in Healthcare', 'How AI is transforming healthcare.', 'https://example.com/ai.jpg', 'https://example.com/ai'),
      ('Future of SaaS', 'Trends shaping SaaS in 2025.', 'https://example.com/saas.jpg', 'https://example.com/saas')
      ON CONFLICT (title) DO NOTHING;
    `);

    // Insert interactions
    await pool.query(`
      INSERT INTO interactions (user_id, content_id, interaction_type)
      VALUES 
