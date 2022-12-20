/**
 * @type {import('eslint-define-config').EslintConfig}
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:json/recommended',
    'plugin:react/jsx-runtime'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    // ts will check these rule
    'no-undef': 'off',
    'no-unused-vars': 'off',

    // replace 'no-redeclare' with @typescript-eslint
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],

    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  }
}
