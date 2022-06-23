module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(jsx|js)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(vue)?$': '@vue/vue3-jest'
  },
  testPathIgnorePatterns: ['/node_modules/'],
  testMatch: [
    // '<rootDir>/src/**/__tests__/**/*.[jt]s',
    '<rootDir>/tests/**/*.(spec|test).(ts|tsx)'
  ],
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx', 'node']
}
