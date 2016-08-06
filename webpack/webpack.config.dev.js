module.exports = {
  entry: './src/index.ts',

  output: {
    path: __dirname + '/lib',
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },

  devtool: 'source-map',

  devServer: {
    contentBase: 'lib'
  }
}
