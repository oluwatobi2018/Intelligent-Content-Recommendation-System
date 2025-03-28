const redis = require('redis');

const redisClient = redis.createClient({
    host: '127.0.0.1', // Replace with your Redis server host
    port: 6379,        // Replace with your Redis server port
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

module.exports = redisClient;
