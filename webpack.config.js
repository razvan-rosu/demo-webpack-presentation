const webpack = require('webpack');
const path = require('path');

// extract inline css
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// vendor bundle and code splitting
const CommonsChunkPlugin = require('./node_modules/webpack/lib/optimize/CommonsChunkPlugin');

// minify bundles
const UglifyJsPlugin = require('./node_modules/webpack/lib/optimize/UglifyJsPlugin');

// dynamicly insert hashed bundles into page template
const HtmlWebpackPlugin = require('html-webpack-plugin');

// resources gzip compression
const CompressionPlugin = require("compression-webpack-plugin");

// bundle performance debugger
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  entry: {
    app: [
      './src/index.js',
      './src/master.scss'
    ],
    page1: './src/scripts/page1.js',
    page2: './src/scripts/page2.js',
    vendor: ['angular']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.[chunkhash:4].js'
  },
  devServer: {
    inline: true,
    port: 1337
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css-loader?sourceMap!autoprefixer?browsers=last 2 versions!sass')
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        loader: 'url-loader?limit=900000'
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        use: {
          options: {
            mimetype: 'application/font-woff',
            name: "./src/fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].bundle.[contenthash:4].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false,
          drop_console: false
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['vendor', 'app']
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin()
  ]
};
