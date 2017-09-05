const webpack = require('webpack');
const path = require('path');
const DotenvPlugin = require('webpack-dotenv-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader', 'import-glob-loader']
        })
      },
      {
        test: /\.svg$/,
        use: ['babel-loader', 'react-svg-loader']
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    new InlineManifestWebpackPlugin({ name: 'webpackManifest' }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      chunks: ['main', 'vendor']
    }),
    new ExtractTextPlugin('styles-[chunkhash].css'),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true,
        sequences: true,
        booleans: true
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
