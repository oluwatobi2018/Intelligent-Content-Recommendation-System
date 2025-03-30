import '@testing-library/jest-dom/extend-expect';

// jest.setup.js

// Import any necessary polyfills or setup libraries

// Mock global variables or functions if needed
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
);

// Clear mocks after each test
afterEach(() => {
    jest.clearAllMocks();
});