// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
  setupFilesAfterEnv: ['./setupTests.js'],
};
