export default {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/tests/'],
  // setupFilesAfterEnv: ['./setupTests.js'],
  // setupFilesAfterEnvですべてのテストで共通する処理を書く。今回はLoginForm.test.jsにimport '@testing-library/jest-dom';が直接書いてあるのでコメントアウトしても大丈夫。
};