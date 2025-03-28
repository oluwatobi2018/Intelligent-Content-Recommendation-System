const { expect } = require('chai');
const { connectToDatabase, closeDatabaseConnection } = require('../database');

describe('Database Connection', () => {
    before(async () => {
        await connectToDatabase();
    });

    after(async () => {
        await closeDatabaseConnection();
    });

    it('should connect to the database successfully', async () => {
        const isConnected = await connectToDatabase();
        expect(isConnected).to.be.true;
    });

    it('should close the database connection successfully', async () => {
        const isClosed = await closeDatabaseConnection();
        expect(isClosed).to.be.true;
    });
});