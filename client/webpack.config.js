const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const plugins = [];

let API_URL = JSON.stringify('http://localhost:3000');

plugins.push(
  new extractTextPlugin('styles.css'),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
  }),
  new HtmlWebpackPlugin({
    hash: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html',
  })
);

if (process.env.NODE_ENV === 'production') {
  API_URL = JSON.stringify('http://localhost:3000');

  plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new babiliPlugin(),
    new optimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        }
      },
      canPrint: true,
    })
  );
}

plugins.push(new webpack.DefinePlugin({
  API_URL
}));

module.exports = {
  entry: {
    app: './app-src/app.js',
    vendor: ['reflect-metadata'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ]
  },
  plugins,
  devServer: {
    noInfo: true,
  },
}
