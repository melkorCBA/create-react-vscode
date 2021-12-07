/* eslint-disable global-require  */
/* eslint-disable  new-cap */

const path = require('path');

const CURRENT_NPM_TASK = process.env.npm_lifecycle_event;
const environment = CURRENT_NPM_TASK === 'build' ? 'production' : 'development';

const { CleanWebpackPlugin: cleanWebpack } = require('clean-webpack-plugin');

const plugins = {

  miniCssExtract: require('mini-css-extract-plugin'),
  htmlWebpack: require('html-webpack-plugin'),
  cleanWebpack,
};

const config = {
  entry: './src/index.js',
  output: {
    filename: 'main.[fullhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new plugins.htmlWebpack({ template: './src/index.html' })],
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,

  },
  mode: environment,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

};

if (environment === 'production') {
// eslint-disable-next-line no-console
  console.log('environment:', environment);
  config.module.rules[0].use[0] = plugins.miniCssExtract.loader;
  config.module.rules[1].use[0] = plugins.miniCssExtract.loader;
  config.plugins.push(
    new plugins.miniCssExtract({ filename: 'main.[fullhash].css' }),
    new plugins.cleanWebpack(),
  );
}

module.exports = config;
