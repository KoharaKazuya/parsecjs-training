module.exports = {
  entry: {
    index: './src/index.ts'
  },

  output: {
    path: __dirname + '/../lib',
    filename: '[name].js'
  },

  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],
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
