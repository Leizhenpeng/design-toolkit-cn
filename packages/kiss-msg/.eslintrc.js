/**
 * @type {import('eslint-define-config').EslintConfig}
 */
module.exports = {
  ignorePatterns: ['README.md', 'src', '.eslintrc.js'],
  extends: '@antfu',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    // ts will check these rule
    'no-undef': 'off',
    'no-unused-vars': 'off',

    // replace 'no-redeclare' with @typescript-eslint
    'no-redeclare': 'off',
    'space-before-blocks': 'off',
    '@typescript-eslint/space-before-blocks': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
}
