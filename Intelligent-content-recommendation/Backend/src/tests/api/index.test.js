const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('API Index Tests', () => {
    it('should respond with a 200 status for the root endpoint', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Welcome to the API');
    });

    it('should return 404 for an unknown endpoint', async () => {
        const response = await request(app).get('/unknown-endpoint');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Endpoint not found');
    });
});