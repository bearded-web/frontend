var webpack = require('webpack');
var path = require('path');
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var isProduction = process.env.NODE_ENV === 'production';

var config = {
    addVendor: function(name, path, forseParse) {
        this.resolve.alias[name] = path;

        if (!forseParse)
            this.module.noParse.push(path);
    },
    context: __dirname,
    entry: {
        app: './app/main.js'
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
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                loader: 'jsx-loader?harmony',
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
                test: /\.(woff|png|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
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

config.addVendor('react', path.resolve(bower_dir, 'react/react-with-addons.js'));
config.addVendor('react-router', path.resolve(bower_dir, 'react-router/dist/react-router.js'));
config.addVendor('bootstrap', path.resolve(bower_dir, 'bootstrap/'));
config.addVendor('bootstrap.css', path.resolve(bower_dir, 'bootstrap/dist/css/bootstrap.css'));
config.addVendor('reflux', path.resolve(bower_dir, 'reflux/dist/reflux.js'));
config.addVendor('font-awesome-webpack', path.resolve(node_modules_dir, 'font-awesome-webpack'), true);
config.addVendor('react-bootstrap', path.resolve(node_modules_dir, 'react-bootstrap'), true);
config.addVendor('swagger-client-generator', path.resolve(node_modules_dir, 'swagger-client-generator'), true);
config.addVendor('jed', path.resolve(bower_dir, 'jed/jed'));
config.addVendor('lodash', path.resolve(bower_dir, 'lodash/dist/lodash.js'));
config.addVendor('fluxxor', path.resolve(bower_dir, 'fluxxor/build/fluxxor.js'));
config.addVendor('pace', path.resolve(bower_dir, 'pace/pace.js'));
config.addVendor('reqwest', path.resolve(node_modules_dir, 'reqwest/reqwest'));
config.addVendor('moment', path.resolve(bower_dir, 'moment/moment'));
config.addVendor('react-domify', path.resolve(node_modules_dir, 'react-domify/dist/react-domify'));

module.exports = config;
