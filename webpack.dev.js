'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const postCssLoaderOptions = {
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
};

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|js|ts)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', postCssLoaderOptions],
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          postCssLoaderOptions,
        ],
      },
      {
        test: /\.sass/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          postCssLoaderOptions,
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
