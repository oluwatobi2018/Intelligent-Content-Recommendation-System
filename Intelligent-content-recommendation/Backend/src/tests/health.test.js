const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file

describe('Health Check Endpoint', () => {
    it('should return status 200 and a health message', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });
});
