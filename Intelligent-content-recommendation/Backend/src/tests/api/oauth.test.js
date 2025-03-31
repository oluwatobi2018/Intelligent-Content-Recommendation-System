const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('OAuth API Tests', () => {
    describe('POST /api/oauth/token', () => {
        it('should return a valid access token for valid credentials', async () => {
            const response = await request(app)
                .post('/api/oauth/token')
                .send({
                    grant_type: 'password',
                    username: 'testuser',
                    password: 'testpassword',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('access_token');
            expect(response.body).toHaveProperty('expires_in');
        });

        it('should return 400 for invalid grant type', async () => {
            const response = await request(app)
                .post('/api/oauth/token')
                .send({
                    grant_type: 'invalid_grant',
                    username: 'testuser',
                    password: 'testpassword',
                });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'unsupported_grant_type');
        });

        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/oauth/token')
                .send({
                    grant_type: 'password',
                    username: 'wronguser',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'invalid_credentials');
        });
    });
});