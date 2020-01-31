/* tslint:disable:no-default-export strict-boolean-expressions no-require-imports no-var-requires*/
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import { DefinePlugin } from 'webpack';
import cssnano from 'cssnano';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
import autoprefixer from 'autoprefixer';
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
              ['@babel/plugin-proposal-class-properties', {loose: true}],
              ['@babel/plugin-proposal-optional-chaining'],
              ['@babel/plugin-proposal-nullish-coalescing-operator']
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.sass$/,
        use: [
          'style-loader',
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
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              data: '@import "mixins"; @import "vars";',
              includePaths: [path.resolve(src, 'uikit')]
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          'svg-inline-loader'
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
