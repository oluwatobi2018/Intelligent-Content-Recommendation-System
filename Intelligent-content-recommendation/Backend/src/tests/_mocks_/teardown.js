// teardown.js

module.exports = async () => {
    // Perform any cleanup tasks after tests are completed
    console.log('Global teardown: Cleaning up resources...');
    
    // Example: Closing database connections
    if (global.__DB_CONNECTION__) {
        await global.__DB_CONNECTION__.close();
        console.log('Database connection closed.');
    }
};