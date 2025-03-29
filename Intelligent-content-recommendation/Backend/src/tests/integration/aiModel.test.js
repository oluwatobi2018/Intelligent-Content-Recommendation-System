const request = require('supertest');
const app = require('../../app'); // Adjust the path to your app entry point

describe('AI Model Integration Tests', () => {
    it('should return a successful response for model prediction', async () => {
        const response = await request(app)
            .post('/api/aimodel/predict') // Adjust the endpoint as per your API
            .send({
                inputData: 'Sample input data for prediction'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('prediction');
    });

    it('should handle invalid input data gracefully', async () => {
        const response = await request(app)
            .post('/api/aimodel/predict')
            .send({
                inputData: null // Invalid input
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return model metadata successfully', async () => {
        const response = await request(app)
            .get('/api/aimodel/metadata'); // Adjust the endpoint as per your API

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('modelName');
        expect(response.body).toHaveProperty('version');
    });
});