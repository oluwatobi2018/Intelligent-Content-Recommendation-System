const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('Content API', () => {
    describe('GET /api/content', () => {
        it('should return a list of content', async () => {
            const response = await request(app).get('/api/content');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /api/content', () => {
        it('should create new content and return it', async () => {
            const newContent = {
                title: 'Sample Content',
                description: 'This is a sample content description.',
            };

            const response = await request(app)
                .post('/api/content')
                .send(newContent);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newContent.title);
            expect(response.body.description).toBe(newContent.description);
        });
    });

    describe('GET /api/content/:id', () => {
        it('should return a single content by ID', async () => {
            const contentId = 1; // Replace with a valid ID from your database or mock
            const response = await request(app).get(`/api/content/${contentId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', contentId);
        });
    });

    describe('PUT /api/content/:id', () => {
        it('should update content by ID and return the updated content', async () => {
            const contentId = 1; // Replace with a valid ID from your database or mock
            const updatedContent = {
                title: 'Updated Content Title',
                description: 'Updated content description.',
            };

            const response = await request(app)
                .put(`/api/content/${contentId}`)
                .send(updatedContent);

            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedContent.title);
            expect(response.body.description).toBe(updatedContent.description);
        });
    });

    describe('DELETE /api/content/:id', () => {
        it('should delete content by ID and return a success message', async () => {
            const contentId = 1; // Replace with a valid ID from your database or mock
            const response = await request(app).delete(`/api/content/${contentId}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Content deleted successfully');
        });
    });
});