const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  plugins: [
    //provides variables by default to all modules
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDom': 'react-dom',
      'Redux': 'redux'
    }),

    // combined with 'html-webpack-template' below, creates a default html document.
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: require('html-webpack-template'),
      //template: 'node_modules/html-webpack-template/index.ejs',

      // Optional
      appMountId: 'app'
      // and any other config options from html-webpack-plugin
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    }),
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, 'assets'),
        from: '**/*',
        to: path.join(__dirname, 'build', 'assets')
      }
    ])
  ],
  module: {
    loaders: [
      {
        test: /(\.scss|\.sass|\.css)$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-react-jsx']
        }
      }
    ]
  },
  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  }
}
