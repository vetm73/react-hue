var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    cache: true,
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './web/index'
    ],
    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'build'),
        publicPath: '/target/build/'

    },
    plugins: [
        new webpack.IgnorePlugin(
            /^\.\/locale$/, /moment$/
        ),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': true,
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: [path.resolve(__dirname,"node_modules")]
            },
            {
                // Fetch polyfill relies on ES6 Promise, which is not supported by IE
                test: /\.js$/,
                loader: 'babel',
                include: /node_modules[\/\\]whatwg-fetch/
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?modules&localIdentName=[name]-[local]--[hash:base64:5]', 'postcss-loader'],
                include: [path.resolve(__dirname,"web")]
            },
            // {
            //     test: /\.css$/,
            //     loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            //     // exclude: /web[\/\\]components/
            //     exclude: [path.resolve(__dirname,"web/components"), path.resolve(__dirname,"web/handlers"), path.resolve(__dirname,"web/helpers")]
            // },
            {
                test: /\.json(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'json',
                include: /config/
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
}
