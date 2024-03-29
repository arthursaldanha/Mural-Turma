// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  "moduleNameMapper": {
    '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@/infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@/main/(.*)$': '<rootDir>/src/main/$1',
    '^@/presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1',

  },
  moduleDirectories: ['node_modules', '<rootDir>/'],

}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)