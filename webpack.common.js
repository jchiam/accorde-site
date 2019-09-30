const path = require('path');

const DotenvPlugin = require('webpack-dotenv-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  optimization: {
    noEmitOnErrors: false,
    splitChunks: {
      cacheGroups: {
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/]react|redux|prop-types|history[\\/]/,
          chunks: 'all',
          priority: 30,
          enforce: true
        },
        firebase: {
          name: 'firebase',
          test: /[\\/]node_modules[\\/]firebase|@firebase[\\/]/,
          chunks: 'all',
          priority: 20,
          enforce: true
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 0,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.example',
      path: './.env'
    }),
    new HtmlWebpackPlugin({ template: 'index.ejs' })
  ]
};
