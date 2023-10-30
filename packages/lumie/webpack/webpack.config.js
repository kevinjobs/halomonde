/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const HtmlMinimizer = require('html-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
  minify: {
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    collapseBooleanAttributes: false,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
  }
});

// 用于复制文件
const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist'),
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ['**/index.html'],
      }
    }
  ]
});

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:8].bundle.js',
    clean: true, // clean the old files when build everytimes. 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '~': path.resolve(__dirname, '../node_modules'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssPlugin.loader,
          "css-loader"
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    copyWebpackPlugin,
    new EslintPlugin(),
    new MiniCssPlugin(),
    new WebpackBar(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizer(),
      new TerserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {
          compress: true,
          mangle: true,
          toplevel: false,
          keep_classnames: false,
        }
      })
    ]
  }
};
