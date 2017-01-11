const webpack = require("webpack");

module.exports = {

    context: __dirname + "/src",

    entry: {
        app: "./index.js"
    },
    output: {
        path: "./publish",
        filename: "[name].bundle.js"
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    resolve: {
        modulesDirectories: ["node_modules"],
        extensions: ["", ".jsx", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                plugins: ["transform-runtime"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },

    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
         warnings: false,
         drop_console: true
         }),*/
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        })
    ]

};