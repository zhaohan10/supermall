module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
    ]
  }
};
