module.exports = {
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts']
};