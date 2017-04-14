const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body'
    }),
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
