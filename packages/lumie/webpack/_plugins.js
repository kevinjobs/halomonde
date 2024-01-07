const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlMinimizer = require('html-minimizer-webpack-plugin');
const _WebpackBar = require('webpackbar');
const MiniCssPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

/** 生产环境：生产 index.html 文件 */
const HTML_PLUGIN = new HtmlWebPackPlugin({
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

// 生产环境：用于复制文件
const COPY_PLUGIN = new CopyWebpackPlugin({
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

/** 通用：eslint checker */
const ESLINT_PLUGIN = new EslintPlugin();

/** 生产环境：最小化css */
const MINI_CSS_PLUGIN = new MiniCssPlugin();

/** 通用：显示打包进度 */
const WEBPACK_BAR_PLUGIN = new _WebpackBar();

/** 生产环境：最小化 HTML 文件 */
const HTML_MIMIMIZE_PLUGIN = new HtmlMinimizer();

/** 开发环境：热更新 */
const HOT_PLUGIN = new webpack.HotModuleReplacementPlugin();

/** 开发环境：热更新 */
const REACT_FRESH_PLUGIN = new ReactRefreshWebpackPlugin();

/** 生产环境：混淆 */
const TERSER_PLUGIN = new TerserPlugin({
  extractComments: true,
  parallel: true,
  terserOptions: {
    compress: true,
    mangle: true,
    toplevel: false,
    keep_classnames: false,
  }
});

module.exports = {
  HTML_PLUGIN,
  COPY_PLUGIN,
  ESLINT_PLUGIN,
  MINI_CSS_PLUGIN,
  WEBPACK_BAR_PLUGIN,
  HTML_MIMIMIZE_PLUGIN,
  HOT_PLUGIN,
  REACT_FRESH_PLUGIN,
  TERSER_PLUGIN,
}
