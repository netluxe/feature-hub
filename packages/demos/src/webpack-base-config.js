// @ts-check

const path = require('path');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin').default;
const webpack = require('webpack');
const merge = require('webpack-merge');
const {getPkgVersion} = require('./get-pkg-version');

/**
 * @type {webpack.Configuration}
 */
const webpackBaseConfig = {
  devtool: false,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {loader: 'ts-loader', options: {transpileOnly: true}},
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    plugins: [
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      new TsConfigPathsPlugin({
        configFile: path.join(__dirname, '../tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_VERSION': JSON.stringify(getPkgVersion('react')),
      'process.env.FEATURE_HUB_REACT_VERSION': JSON.stringify(
        getPkgVersion('@feature-hub/react')
      ),
      'process.env.BLUEPRINT_NAMESPACE': "'bp3'",
    }),
  ],
};

/**
 * @param {string} dirname name of the directory that contains integrator.node.tsx
 * @return {webpack.Configuration}
 */
const createNodeIntegratorWebpackConfig = (dirname) =>
  merge.merge(webpackBaseConfig, {
    entry: path.join(dirname, './integrator.node.tsx'),
    output: {
      filename: 'integrator.node.js',
      libraryTarget: 'commonjs2',
      publicPath: '/',
    },
    target: 'node',
  });

module.exports = {webpackBaseConfig, createNodeIntegratorWebpackConfig};
