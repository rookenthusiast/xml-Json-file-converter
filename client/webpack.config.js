config = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: "./build"
  },
  devtool: 'source-map',
  node: {
  fs: "empty"
}
}

module.exports = config;