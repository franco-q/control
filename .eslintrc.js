module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  plugins: ['html'],
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'space-before-function-paren': ['error', 'never'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-mixed-spaces-and-tabs": [0],
    "no-tabs": 0,
    "skipBlankLines": 0,
    "ignoreComments": 0,
    "camelcase": 0,
    "eqeqeq": 0,
    "no-unused-vars": 0,
    "indent": 0,
    "brace-style": 0,
    "no-trailing-spaces": [2, { "skipBlankLines": true }]
  },
  extends: ['standard', 'plugin:vue/base']
}
