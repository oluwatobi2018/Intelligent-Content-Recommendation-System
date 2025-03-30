const jwt = require('jsonwebtoken');

/**
 * Role-Based Access Control Middleware
 * @param {Array} allowedRoles - Array of roles allowed to access the route
 */
const rbacMiddleware = (allowedRoles = []) => {
    return (req, res, next) => {
        try {
            // Extract token from headers
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Access token is missing' });
            }

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // Check if user's role is allowed
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    };
};

module.exports = rbacMiddleware;