const path = require("path");
module.exports = {
  entry: "./background.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "background.js"
  }
};
