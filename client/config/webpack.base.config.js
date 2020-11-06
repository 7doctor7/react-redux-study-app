import webpack from 'webpack';
import dotenv from 'dotenv';
import Dotenv from 'dotenv-webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import Paths from './paths';

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

envKeys.__DEV__ = envKeys['process.env.DEBUG'] || 'false';

export default new Config().merge({
  // entry: './src/index.js',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: Paths.outputPath,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/react',
            {
              plugins: ['@babel/plugin-proposal-class-properties']
            }
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HR Assistant',
      favicon: Paths.faviconPath,
      template: Paths.templatePath
    }),
    new CopyWebpackPlugin([{ from: Paths.assetsPath, to: '../build/assets' }]),
    new MiniCssExtractPlugin(),
    new Dotenv({
      safe: true,
      silent: true
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    contentBase: Paths.outputPath,
    compress: true,
    hot: true
  },
  devtool: env.NODE_ENV === 'dev' ? 'cheap-module-eval-source-map' : undefined
});
