module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // use TypeScript parser
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    node: true,
    es2020: true,
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // enables eslint-plugin-prettier & prettier config
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/explicit-function-return-type': 'off', // optional
    '@typescript-eslint/no-explicit-any': 'off', // optional
  },
};
