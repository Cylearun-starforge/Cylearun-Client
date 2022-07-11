module.exports = {
  extends: ['eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier'],
  ignorePatterns: ['**/*.test.ts', '**/*.spec.ts'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
