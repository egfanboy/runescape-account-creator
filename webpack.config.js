const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    background: path.join(__dirname, "src", "background", "background.js"),
    ui: path.join(__dirname, "src", "ui", "index.js")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js"
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src" }], {
      copyUnmodified: false,
      ignore: ["background/**", "ui/**"]
    })
  ]
};
