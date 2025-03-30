const request = require('supertest');
const app = require('../app'); // Adjust the path to your app entry point

describe('API Contract Tests', () => {
    it('should return the expected response for GET /api/example', async () => {
        const response = await request(app).get('/api/example');
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            data: expect.any(Object),
        });
    });

    it('should return 404 for an unknown endpoint', async () => {
        const response = await request(app).get('/api/unknown');
        expect(response.status).toBe(404);
        expect(response.body).toMatchObject({
            success: false,
            message: 'Not Found',
        });
    });

    it('should validate request payload for POST /api/example', async () => {
        const invalidPayload = { invalidKey: 'value' };
        const response = await request(app)
            .post('/api/example')
            .send(invalidPayload);
        expect(response.status).toBe(400);
        expect(response.body).toMatchObject({
            success: false,
            message: expect.any(String),
        });
    });
});