/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssPlugin = require('mini-css-extract-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');
const {
  HTML_PLUGIN,
  COPY_PLUGIN,
  ESLINT_PLUGIN,
  MINI_CSS_PLUGIN,
  WEBPACK_BAR_PLUGIN,
  HTML_MIMIMIZE_PLUGIN,
  HOT_PLUGIN,
  REACT_FRESH_PLUGIN,
  TERSER_PLUGIN,
} = require('./_plugins');

const IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  entry: {
    index: path.resolve(__dirname, '../src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: IS_DEV ? 'js/bundle.js' : 'js/[name].[contenthash:8].bundle.js',
    clean: IS_DEV ? false : true, // clean the old files when build everytimes. 
  },
  devtool: IS_DEV && 'inline-source-map', // 调试定位错误行
  devServer: IS_DEV ? {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true, // 热替换重载
    compress: true, // gzip 压缩静态文件
    host: 'localhost', // 允许其他设备访问
    open: true, // 启动后打开浏览器,
    port: 12345, // 设置端口
  } : {},
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
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: IS_DEV ? {
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            } : {}
          }
        ],
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          IS_DEV ? 'style-loader' : MiniCssPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                auto: (resourcePath) => resourcePath.endsWith('.less'),  // 匹配.less文件来进行css模块化。
                localIdentName: '[local]_[hash:base64:10]',
              },
            }
          },
          "less-loader"
        ],
      },
    ],
  },
  plugins: [
    HTML_PLUGIN,
    ESLINT_PLUGIN,
    WEBPACK_BAR_PLUGIN,
    !IS_DEV && HTML_MIMIMIZE_PLUGIN,
    !IS_DEV && COPY_PLUGIN,
    !IS_DEV && MINI_CSS_PLUGIN,
    IS_DEV && HOT_PLUGIN,
    IS_DEV && REACT_FRESH_PLUGIN,
  ],
  optimization: {
    minimize: IS_DEV ? false : true,
    minimizer: [
      !IS_DEV && TERSER_PLUGIN,
    ]
  }
};
