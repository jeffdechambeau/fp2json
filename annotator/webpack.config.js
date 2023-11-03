const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const path = require('path');

module.exports = {
  entry: './main.js', // Your entry point file
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inlineSource: '.(js|css)$', // embed all javascript and css inline
    }),
    new InlineSourceWebpackPlugin(),
  ],
  module: {
    rules: [],
  },
};
