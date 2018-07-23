
require('angularjs-template-loader');
require('babel-loader');
require('file-loader');
require('raw-loader');
require('svg-url-loader');
//require('webpack-material-design-icons');
module.exports = {
    "mode": "production",
    "entry": "./src/js/app.module.js",
    // "entry": {
        // app: "./src/js/app.module.js",
        // vendors: [
            // "webpack-material-design-icons"
            // ]
    // },
    "output": {
        "path": __dirname + '/dist/js',
        //"filename": "[name].[chunkhash:8].js"
        "filename": "bundle.js"
    },
    // "devtool": "source-map",
    "module": {
        "rules": [
            {
                "test": /\.js$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "babel-loader",
                    "options": {
                        "presets": [
                            "env"
                        ]
                    }
                }
            },
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader"
                ]
            }, {
                // ASSET LOADER
                // Reference: https://github.com/webpack/file-loader
                // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
                // Rename the file using the asset hash
                // Pass along the updated reference to your code
                // You can add here any file extension you want to get copied to your output
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'file-loader'
            }, {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                loader: 'angularjs-template-loader',
                options: {
                    relativeTo: './src/js'
                }
            }, {
                test: /\.svg$/, loader: 'svg-url-loader'
            }
        ]
    },
    devServer: {
        port: 8080, // configuring port for localserver
        contentBase: './dist' // configuring from where content needs to be served
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    watch: false
}
