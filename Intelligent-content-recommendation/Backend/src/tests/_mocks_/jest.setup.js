import '@testing-library/jest-dom/extend-expect';

// jest.setup.js

// Import any necessary libraries or polyfills

// Mock global objects or setup configurations if needed
global.fetch = require('jest-fetch-mock');

// Add any custom setup for your tests
beforeEach(() => {
    jest.clearAllMocks();
});