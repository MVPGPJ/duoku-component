var path = require('path');
const uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/downloadManager.js',
    //生成map文件 方便调试
    devtool: '#source-map',
    output: {
        libraryTarget:"umd",//umd:amd cmd
        library: "DUOKU",
        path: path.resolve("E:\\study\\duoku-components\\duoku-download", 'dist'),
        filename: 'download-manager.min.[chunkhash:8].js'
    },
    module: {
        rules:[
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new uglify()
    ]
};