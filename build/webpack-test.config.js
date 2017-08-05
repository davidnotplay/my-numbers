const config = require('./webpack-base.config')('test')
config.module.rules[0].use.options.plugins.push('istanbul')
module.exports = config
