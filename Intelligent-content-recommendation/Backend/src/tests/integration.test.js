const request = require('supertest');
const app = require('../app'); // Adjust the path to your app entry point

describe('Integration Tests', () => {
    it('should return 200 for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });

    it('should handle a POST request to /api/resource', async () => {
        const payload = { key: 'value' };
        const response = await request(app)
            .post('/api/resource')
            .send(payload)
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
    });

    it('should return 404 for an unknown endpoint', async () => {
        const response = await request(app).get('/unknown-endpoint');
        expect(response.statusCode).toBe(404);
    });
});