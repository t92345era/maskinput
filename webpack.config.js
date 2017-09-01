module.exports = {
  entry: './js/src/app.js',
  output: {
    filename: './js/jq-maskinput.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query:{
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};