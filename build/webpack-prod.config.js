const webpack = require('webpack')
const config = require('./webpack-base.config')('prod')

config.plugins = config.plugins || []
config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }))

module.exports = config
