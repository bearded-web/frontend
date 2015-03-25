var webpack = require('webpack');
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var isProduction = process.env.NODE_ENV === 'production';

var config = {
    context: __dirname,
    entry: {
        app: [
            './app/main.js']
    },
    output: {
        publicPath: isProduction ? '/' : 'http://localhost:8080/',
        path: path.resolve(__dirname, isProduction ? './dist/' : './build'),
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: { }
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=50000&minetype=application/font-woff"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                exclude: [
                    bower_dir,
                    node_modules_dir
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                loader: 'url-loader?limit=10000'
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('app', null, false)
    ]
};


module.exports = config;
