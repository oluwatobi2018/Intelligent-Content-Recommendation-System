-- Drop tables if they already exist
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS interactions CASCADE;
DROP TABLE IF EXISTS recommendations CASCADE;

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Table
CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Interactions Table
CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content_id INT REFERENCES content(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) CHECK (interaction_type IN ('click', 'like', 'view', 'share', 'bookmark')),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations Table
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content_id INT REFERENCES content(id) ON DELETE CASCADE,
    score FLOAT NOT NULL,
    recommended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Optimization
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_content_title ON content(title);
CREATE INDEX idx_interactions_user ON interactions(user_id);
CREATE INDEX idx_interactions_content ON interactions(content_id);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
