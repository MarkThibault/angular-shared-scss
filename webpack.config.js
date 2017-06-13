var isProduction = process.argv.indexOf('-p') !== -1;
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

// examples configurations
var exampleConfig = {
  context: __dirname,
  devtool: "inline-sourcemap",
  entry: {
    app:"./examples/src/index.ts",
    vendor: "./examples/src/vendor.ts",
  },
  output: {
    path: __dirname + "/examples/dist",
    filename: "./app.js"
  },
  module: {
    loaders: [
      {
        test:/\.ts$/,
        loader: 'awesome-typescript-loader!tslint'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass']),
      },
      {
        test: /\.svg$/,
        loader: 'raw-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  postcss() {
    return [autoprefixer];
  },
  resolve: {
    extensions: ['', '.js', '.ts']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new HtmlWebpackPlugin({
      template: './examples/src/index.html'
    }),
    new ExtractTextPlugin('./style.css', {
          allChunks: true
      })
  ]
};

// production configurations
if (isProduction || process.env.NODE_ENV === 'production') {  
  exampleConfig.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  );
  exampleConfig.devtool = null;
}

// build
module.exports = [exampleConfig];