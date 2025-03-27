-- Drop tables if they already exist (with cascade to remove dependencies)
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
    link TEXT CHECK (link ~* '^https?://.+$'), -- Ensure valid URL format
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Interactions Table
CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id INT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) NOT NULL CHECK (
        interaction_type IN ('click', 'like', 'view', 'share', 'bookmark')
    ),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recommendations Table (Avoid duplicate recommendations)
CREATE TABLE recommendations (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_id INT NOT NULL REFERENCES content(id) ON DELETE CASCADE,
    score FLOAT NOT NULL CHECK (score BETWEEN 0 AND 1), -- Score range validation
    recommended_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, content_id) -- Prevent duplicate recommendations
);

-- Optimized Indexes for Query Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_content_title ON content(title);
CREATE INDEX idx_interactions_user_content ON interactions(user_id, content_id);
CREATE INDEX idx_recommendations_user_content ON recommendations(user_id, content_id);
