const rateLimit = require('express-rate-limit');

// Rate limiter configuration
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // ⏳ 15-minute window
    max: 100, // 🚦 Limit each IP to 100 requests per window
    standardHeaders: true, // ✅ Include rate limit info in the response headers (RateLimit-*)
    legacyHeaders: false, // ❌ Disable deprecated X-RateLimit-* headers
    message: {
        status: 429,
        error: 'Too many requests. Please slow down and try again later.',
    },
    keyGenerator: (req) => req.ip, // 🔑 Use IP address for rate limiting
    handler: (req, res, next) => {
        res.status(429).json({
            status: 429,
            error: 'Too many requests. Please try again later.',
        });
    },
});

module.exports = rateLimiter;
