const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file

describe('Content Recommendation API', () => {
    it('should return recommended content for a valid user', async () => {
        const response = await request(app)
            .get('/api/recommendations')
            .query({ userId: '12345' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('recommendations');
        expect(Array.isArray(response.body.recommendations)).toBe(true);
    });

    it('should return 400 for missing userId', async () => {
        const response = await request(app).get('/api/recommendations');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return 404 if no recommendations are found', async () => {
        const response = await request(app)
            .get('/api/recommendations')
            .query({ userId: 'nonexistent' });

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});