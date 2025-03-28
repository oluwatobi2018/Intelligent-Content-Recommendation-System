const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1', //Replace with your Redis server host
  port: process.env.REDIS_PORT || 6379,        // Replace with your Redis server port
  password: process.env.REDIS_PASSWORD || undefined,
});

redis.on('connect', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redis;
