module.exports = {
  parser: '@babel/eslint-parser',
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',

  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'linebreak-style': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/function-component-definition': [0],
  },
};
