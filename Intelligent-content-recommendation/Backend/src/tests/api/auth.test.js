const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('Authentication API Tests', () => {
    describe('POST /api/auth/login', () => {
        it('should return 200 and a token for valid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'wrong@example.com', password: 'wrongpassword' });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });
    });

    describe('POST /api/auth/register', () => {
        it('should return 201 and create a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({ email: 'newuser@example.com', password: 'password123' });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
        });

        it('should return 400 for missing fields', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({ email: '' });

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });
});