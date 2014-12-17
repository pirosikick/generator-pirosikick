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
      { test:  /\.jsx$/, loader: 'jsx-loader?harmony' }
    ]
  }
}
