export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  injectGlobals: true,
  testPathIgnorePatterns: ['<rootDir>/__tests__/.jest.setup.ts'],
};
