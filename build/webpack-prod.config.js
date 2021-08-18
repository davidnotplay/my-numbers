const path = require('path')

module.exports = function() {
  return { 
    mode: 'production',
    entry: './src/my-numbers.js',
    output: {
      filename: 'my-numbers.js',
      path: path.resolve(__dirname, '../dist'),
      library: 'MyNumbers',
      libraryExport: 'default',
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        }
      ]
    },
    devtool: 'source-map'
  }
}
