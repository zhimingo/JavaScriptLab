'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css/,
        // use: ['style-loader', 'css-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [
          MiniCssExtractPlugin.loader,
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
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false,
      },
    }),
    new CleanWebpackPlugin(),
  ],
};
