const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/favicons' }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              minifyCSS: true,
              collapseWhitespace: true,
              removeComments: true
            }
          : false
    })
  ]
};
