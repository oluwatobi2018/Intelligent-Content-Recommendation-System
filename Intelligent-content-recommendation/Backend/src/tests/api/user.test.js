const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('User API Tests', () => {
    describe('GET /api/users', () => {
        it('should return a list of users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
            const res = await request(app).post('/api/users').send(newUser);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe(newUser.name);
            expect(res.body.email).toBe(newUser.email);
        });
    });

    describe('GET /api/users/:id', () => {
        it('should return a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const res = await request(app).get(`/api/users/${userId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', userId);
        });
    });

    describe('PUT /api/users/:id', () => {
        it('should update a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const updatedData = { name: 'Jane Doe' };
            const res = await request(app).put(`/api/users/${userId}`).send(updatedData);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(updatedData.name);
        });
    });

    describe('DELETE /api/users/:id', () => {
        it('should delete a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const res = await request(app).delete(`/api/users/${userId}`);
            expect(res.statusCode).toBe(204);
        });
    });
});