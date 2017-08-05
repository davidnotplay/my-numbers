const webpack = require('webpack')
const config = require('./webpack-base.config')('prod')

config.plugins = config.plugins || []
config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({ minimize: false })
)

module.exports = config
