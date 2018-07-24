
require('angularjs-template-loader');
require('babel-loader');
require('file-loader');
require('raw-loader');
require('svg-url-loader');
module.exports = {
    "mode": "production",
    "entry": {
        vendors: [
            "./src/js/app.module.js",
        ]
    },
    "output": {
        "path": __dirname + '/dist/js',
        //"filename": "[name].[chunkhash:8].js"
        "filename": "bundle.js"
    },
    //"devtool": "source-map",
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
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'file-loader'
            },
            { test: /\.(svg|eot|woff|ttf|svg|woff2)$/, 
                loader: 'url-loader?limit=100000&name=../fonts/[name].[ext]' },
            {
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
    performance: { hints: false },
    devServer: {
        port: 8080,
        contentBase: './dist'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    watch: false
}
