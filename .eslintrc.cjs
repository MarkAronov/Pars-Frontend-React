module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
    'react-app',
    'prettier',
    'react-app/jest',
    'plugin:react/recommended',
  ],
  plugins: ['react', 'prettier', 'react-hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'off',
    'func-names': 'off',
    'no-process-exit': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'react/prop-types': 'off',
    'arrow-body-style': 'error',
    'prefer-arrow-callback': 'error',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
