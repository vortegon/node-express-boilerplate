module.exports = {
  parserOptions: {
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  env: {
    node: true
  },
  extends: ['standard', 'wesbos', 'prettier', 'prettier/standard', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {
    'promise/catch-or-return': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true
      }
    ],
    semi: [2, 'always'],
    'no-use-before-define': ['error', 'nofunc']
  }
};
