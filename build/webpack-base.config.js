const path = require('path')

module.exports = function(env) {
  const webpackConfig = { 
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['latest'],
              plugins: ['transform-object-rest-spread']
            }
          }
        }
      ]
    },
    devtool: env === 'prod' ? 'source-map' : 'eval-source-map'
  }


  // entry and output

  if (env !== 'test') {
    webpackConfig.entry = './src/my-numbers.js'
    webpackConfig.output = {
      filename: 'my-numbers.js',
      path: path.resolve(__dirname, '../dist'),
      library: 'MyNumbers',
      libraryExport: 'default',
      libraryTarget: 'umd'
    }
  }

  return webpackConfig
}