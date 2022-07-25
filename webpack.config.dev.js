const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// // const webpackBundleAnalyzer = require('webpack-bundle-analyzer');

// eslint-disable-next-line no-undef
process.env.NODE_ENV = 'development';

// eslint-disable-next-line no-undef
module.exports = {
  mode: 'development',
  target: 'web',
  // devtool: 'source-map',
  entry: './src/index',
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  // to be commented
  devServer: {
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: false
  },
  // to be commented
  plugins: [
    // Display Bundle Stats
    // new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: 'static' }),

    // new MiniCssExtractPlugin({
    //   filename: '[name].[contenthash].css'
    // }),

    new webpack.DefinePlugin({
      // eslint-disable-next-line no-undef
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.API_URL': JSON.stringify('http://localhost:3001')
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true
      // }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       sourceMap: true
        //     }
        //   },
        //   {
        //     loader: 'postcss-loader',
        //     options: {
        //       postcssOptions: {
        //         plugins: [() => require('cssnano')]
        //       },
        //       sourceMap: true
        //     }
        //   }
        // ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
};
