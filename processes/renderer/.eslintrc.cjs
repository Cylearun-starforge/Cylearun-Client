/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['@cylearun/eslint-config/web'],
  globals: {
    define: 'readonly',
    runtime: 'readonly',
    rc: 'readonly',
  },
};
