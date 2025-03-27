require("dotenv").config();
const { Pool } = require("pg");

// Database connection configuration
const pool = new Pool({
  user: process.env.DB_USER || "remmyadeogun",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "recommendation_db",
  password: process.env.DB_PASSWORD || "your_password",
  port: Number(process.env.DB_PORT) || 5432,
});

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Insert users and retrieve their IDs
    const users = await pool.query(
      `INSERT INTO users (email, password_hash, full_name)
       VALUES 
       ('john.doe@example.com', 'hashed_password_123', 'John Doe'),
       ('jane.smith@example.com', 'hashed_password_456', 'Jane Smith')
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email;`
    );
    console.log(`✅ Inserted users:`, users.rows);

    // Insert content and retrieve their IDs
    const content = await pool.query(
      `INSERT INTO content (title, description, image_url, link)
       VALUES 
       ('AI in Healthcare', 'How AI is transforming healthcare.', 'https://example.com/ai.jpg', 'https://example.com/ai'),
       ('Future of SaaS', 'Trends shaping SaaS in 2025.', 'https://example.com/saas.jpg', 'https://example.com/saas')
       ON CONFLICT (title) DO NOTHING
       RETURNING id, title;`
    );
    console.log(`✅ Inserted content:`, content.rows);

    // Insert interactions (Example: Assign first user to first content)
    if (users.rows.length > 0 && content.rows.length > 0) {
      await pool.query(
        `INSERT INTO interactions (user_id, content_id, interaction_type)
         VALUES 
         ($1, $2, 'click'),
         ($1, $3, 'like'),
         ($2, $2, 'view')
         ON CONFLICT DO NOTHING;`,
        [users.rows[0].id, content.rows[0].id, content.rows[1].id]
      );
      console.log("✅ Inserted interactions.");
    } else {
      console.warn("⚠️ Skipping interactions - No users or content found.");
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await pool.end(); // Close connection
  }
};

// Run seeding script
seedDatabase();
