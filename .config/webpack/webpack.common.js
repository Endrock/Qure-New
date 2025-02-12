/**
 * * Webpack configuration.
 */

const path = require("path");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, "../../assets");
const SASS_DIR = path.resolve(__dirname, "../../src/scss");
const JS_DIR = path.resolve(__dirname, "../../src/js");

const entry = {
  "pwd.theme-styles": SASS_DIR + "/theme.scss",
};

const output = {
  path: BUILD_DIR,
  filename: "[name].js",
};

const rules = [
  {
    test: /\.js$/,
    include: [JS_DIR],
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  },
  {
    include: [SASS_DIR],
    test: /\.css$/i,
    use: ["style-loader", "css-loader"],
  },
  {
    include: [SASS_DIR],
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [miniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
];

module.exports = {
  entry: entry,

  output: output,

  devtool: "source-map",

  module: {
    rules: rules,
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
