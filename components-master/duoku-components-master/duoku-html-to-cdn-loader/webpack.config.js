const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:  path.resolve('./test/main.js'),
  output: {
    filename: 'mian.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget:'var',
    library:'DUOKU'
  },
  module:{
    rules:[
      {
        test: /\.html$/i,
        loader: path.resolve('./src/index.js'),
        options:{}
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve('./test/index.html'), //指定要打包的html路径和文件名
      filename:'index.html' //指定输出路径和文件名
    })
  ]
};