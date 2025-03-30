const client = require('prom-client');

// Create a Registry to register metrics
const register = new client.Registry();

// Define default metrics
client.collectDefaultMetrics({ register });

// Example of a custom metric: Counter
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
});

// Register the custom metric
register.registerMetric(requestCounter);

// Middleware to track HTTP requests
function prometheusMiddleware(req, res, next) {
    res.on('finish', () => {
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode,
        });
    });
    next();
}

// Endpoint to expose metrics
function metricsEndpoint(app) {
    app.get('/metrics', async (req, res) => {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    });
}

module.exports = {
    prometheusMiddleware,
    metricsEndpoint,
};