
require('angularjs-template-loader');
require('babel-loader');
require('file-loader');
require('raw-loader');
require('svg-url-loader');
const Visualizer = require('webpack-visualizer-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
   "mode": "production",
   "entry": {
      vendors: [
         "babel-polyfill",
         "./src/js/app.module.js",
      ]
   },
   "output": {
      "path": __dirname + '/dist/js',
      //"filename": "bundle.[chunkhash:8].js"
      "filename": "bundle.js"
   },
   "devtool": "source-map",
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
         // { test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
         //  loader: 'url-loader?limit=100000&name=../fonts/[name].[ext]' },
         {
            test: /\.html$/,
            loader: 'raw-loader'
         },
         {
            loader: 'angularjs-template-loader',
            options: {
               relativeTo: './src/js'
            }
         }
      ]
   },
   plugins: [
      new CopyWebpackPlugin([{ from: 'dist/', to: '../../../server/dist'}], {
         copyUnmodified: false,
         debug: 'info',
         context: './'
      }),

      new Visualizer({
         filename: '../../statistics.html'
      })
   ],
   performance: { hints: false },
   devServer: {
      hot: true,
      port: 8080,
      contentBase: './dist',
      compress: true,
      open: false
   },
   watchOptions: {
      poll: true,
      ignored: /node_modules/
   },
   watch: false
}
