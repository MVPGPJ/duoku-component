var path = require('path');
const uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/duoku-slider.js',
    output: {
        libraryTarget:"var",//umd:amd cmd
        library: "DUOKU",
        path: path.resolve("E:\\study\\duoku-components\\duoku-slider", 'dist'),
        filename: 'duoku-slider.min.1.1.js'
    },
    module: {
        rules: [{
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 50000,
            }
          }
        ]
    },
    plugins: [
        new uglify({
          uglifyOptions: {
            minimize:true,
            compress: {
              warnings: false,
              global_defs: {
                "@console.log": "alert"
              },
              passes: 2
            }
          },
          parallel: true
        })
    ]
};