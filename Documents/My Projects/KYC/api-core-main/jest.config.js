// eslint-disable-next-line no-undef
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: './coverage/',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).ts?(x)'],
  verbose: true,
  setupFiles: ['dotenv/config']
};