const request = require('supertest');
const app = require('../app'); // Adjust the path to your app file

describe('User API Tests', () => {
    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const res = await request(app).get('/users');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
            const res = await request(app).post('/users').send(newUser);
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe(newUser.name);
            expect(res.body.email).toBe(newUser.email);
        });
    });

    describe('GET /users/:id', () => {
        it('should return a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const res = await request(app).get(`/users/${userId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('id', userId);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const updatedUser = { name: 'Jane Doe', email: 'jane.doe@example.com' };
            const res = await request(app).put(`/users/${userId}`).send(updatedUser);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(updatedUser.name);
            expect(res.body.email).toBe(updatedUser.email);
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete a user by ID', async () => {
            const userId = 1; // Replace with a valid user ID
            const res = await request(app).delete(`/users/${userId}`);
            expect(res.statusCode).toBe(204);
        });
    });
});
