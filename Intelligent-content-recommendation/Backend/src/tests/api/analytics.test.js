const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('Analytics API', () => {
    describe('GET /api/analytics', () => {
        it('should return analytics data with a 200 status code', async () => {
            const response = await request(app).get('/api/analytics');
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });
    });

    describe('POST /api/analytics', () => {
        it('should create a new analytics entry and return it', async () => {
            const newAnalyticsData = { metric: 'page_views', value: 100 };
            const response = await request(app)
                .post('/api/analytics')
                .send(newAnalyticsData);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.metric).toBe(newAnalyticsData.metric);
            expect(response.body.value).toBe(newAnalyticsData.value);
        });

        it('should return 400 for invalid data', async () => {
            const invalidData = { metric: '' }; // Missing required fields
            const response = await request(app)
                .post('/api/analytics')
                .send(invalidData);
            expect(response.status).toBe(400);
        });
    });
});