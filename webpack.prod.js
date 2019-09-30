const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
  mode: 'production',
  entry: 'index.tsx',
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', 'import-glob-loader']
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            name: 'assets/[name]-[hash].[ext]'
          }
        }
      },
      {
        test: /\.(gif|png|jpg|jpeg|eot)(\?[a-z0-9]+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name]-[hash].[ext]'
          }
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 1000000,
    maxAssetSize: 400000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name]-[hash].css',
      chunkFilename: "[id].css"
    }),
    new CleanWebpackPlugin()
  ]
});
