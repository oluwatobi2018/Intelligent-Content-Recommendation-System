const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Database Integration Tests', () => {
    it('should connect to the in-memory database', async () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 means connected
    });

    // Add more tests for database operations here
});