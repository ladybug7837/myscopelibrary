const vueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeExternals = require('webpack-node-externals');
const autoPrefixer = require('autoprefixer');
const path = require('path');

/** @type import('webpack').Configuration */
const config = {
  mode: 'production',
  devtool: false,
  externals: [/^@emobg\//, nodeExternals(), 'vue'],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@packages': path.resolve('./packages/'),
    },
  },
  output: {
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false,
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  parallelism: 3,
  plugins: [new vueLoaderPlugin(), autoPrefixer],
};
module.exports = config;
