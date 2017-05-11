/*
 * This is the 'development' config for webpack
 * The command 'npm start' will use this config and will
 * allow for hot reloading and set up local server
 *
 */


var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    base: ['webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './src/js/index']
  },
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'main-asset.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot-loader', 'babel-loader'],
        include: path.join(__dirname, 'src/js')
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { 
        test: /\.(png|jpg|svg)$/, 
        loader: 'url-loader?limit=8192' 
      }
    ]
  }
};