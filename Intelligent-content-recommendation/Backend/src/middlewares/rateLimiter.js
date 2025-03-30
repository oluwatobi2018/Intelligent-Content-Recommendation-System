const rateLimit = require('express-rate-limit');

// Define the rate limiter middleware
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
    headers: true, // Include rate limit info in the response headers
});

// Export the middleware
module.exports = rateLimiter;
