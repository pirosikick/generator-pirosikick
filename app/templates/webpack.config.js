var webpack = require('webpack');

module.exports = {
  entry: {
    client: './src/client.jsx'
  },
  output: {
    path: __dirname + '/.tmp/scripts',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test:  /\.(js|jsx)$/, exclude: /node_modules/, loader: '6to5-loader?experimental&runtime' }
    ]
  }
  plugins: [
    new webpack.ProvidePlugin({
      to5Runtime: "imports?global=>{}!exports?global.to5Runtime!6to5/runtime"
    })
  ]
}
