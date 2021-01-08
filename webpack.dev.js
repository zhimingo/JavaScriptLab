'use strict';

const configuration = require('./configuration');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            // 配置详情见 https://github.com/webpack-contrib/postcss-loader
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')({
                    overrideBrowserslist: ['last 4 version', '>1%', 'ios 7'],
                  }),
                  require('postcss-px-to-viewport')({
                    unitToConvert: 'px',
                    viewportWidth: 375,
                    unitPrecision: 5,
                    propList: ['*'],
                    viewportUnit: 'vw',
                    fontViewportUnit: 'vw',
                    selectorBlackList: [],
                    minPixelValue: 1,
                    mediaQuery: false,
                    replace: true,
                    exclude: [/node_modules/],
                  }),
                ],
              },
            },
          },
        ],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    index: 'index.html',
    hot: true,
    stats: 'errors-only',
    quiet: true,
  },
};
