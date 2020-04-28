const path = require('path');
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
     contentBase: './dist',
  },
  node: { fs: 'empty' },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader',
         ],
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       },       
     ],
   },
  plugins: [
   new CopyPlugin([
     'node_modules/ccapture.js/build/CCapture.all.min.js',
   ]),
 ],
};
