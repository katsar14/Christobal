const path = require('path');

module.exports = {
    entry: {
        main: './src/js/index.js',
        vendor: './src/js/vendor.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build/js')
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    }
}