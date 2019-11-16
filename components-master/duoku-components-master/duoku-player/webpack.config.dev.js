const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/VideoPlayer.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'videoplayer.js',
    library: "dk",
    libraryTarget: 'umd'
  },
  devServer: {
    contentBase: './dist',
    host: '172.16.20.203'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'video player',
    }),
    new CopyWebpackPlugin([
      {
        from: './example/movie.mp4',
        to: './'
      },
      {
        from: './example/video_default.jpg',
        to: './'
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, 
        // include: [path.resolve(__dirname,'./src')]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader',"sass-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 100
        }
      }
    ]
  }
};