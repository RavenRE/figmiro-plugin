/* tslint:disable:no-default-export strict-boolean-expressions no-require-imports no-var-requires*/
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import { DefinePlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
const {version} = require('../package.json');

const dist = path.resolve('build');
const src = path.resolve('./app');
const {NODE_ENV} = process.env;
const isProd = NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  output: {
    path: dist,
    filename: '[name].js'
  },
  entry: {
    ui: path.join(src, 'ui.tsx'),
    main: path.join(src, 'index.tsx')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({
      configFile: path.resolve('./tsconfig.json')
    })]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}]
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.sass$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              modules: {
                mode: 'local',
                localIdentName: '[local]_project-name_[hash:base64:5]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer(),
                ...(isProd ? [cssnano(({preset: 'default'}))] : [])
              ],
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
              data: '@import "mixins"; @import "vars";',
              includePaths: [path.resolve(src, 'uikit')]
            }
          }
        ]
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        use: [
          'file-loader?name=images/[name].[ext]'
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    module: 'empty'
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[hash].css' : '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.html'),
      chunks: ['ui'],
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new DefinePlugin({
      VERSION: JSON.stringify(version)
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
};
