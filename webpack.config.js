const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const inlineSvg = require('postcss-inline-svg')
const svgo = require('postcss-svgo')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.argv.indexOf('--production') !== -1

const config = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 1337,
    contentBase: './'
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:1337',
    './lib/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'wscn-charts.js',
    library: 'WscnCharts',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.scss/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.js/,
        loader: 'babel',
        include: /lib/,
        exclude: /node_modules/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url?limit=50000'
      }
    ]
  },
  sassLoader: {
    sourceMap: true
  },
  postcss: [
    inlineSvg(),
    svgo(),
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    }),
    new OpenBrowserPlugin({url: 'http://localhost:1337'})
  ]
}

if (isProduction) {
    config.externals =  {
    "d3": {
      d3: 'd3',
      d3: 'd3',
      d3: 'd3',
      amd: 'd3'
    }
  }
  config.entry = './lib/index.js'
  config.output.filename = 'wscn-charts.js'
}

module.exports = config;
