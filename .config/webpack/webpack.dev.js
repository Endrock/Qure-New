const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const miniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackShellPluginNext = require("webpack-shell-plugin-next");

require("dotenv").config();
const storeUrl = process.env.STORE_URL;

const plugins = () => [
  new miniCssExtractPlugin({
    filename: "[name].css",
  }),
  new webpackShellPluginNext({
    onBuildStart: {
      scripts: ["echo Webpack build in progress...🛠"],
    },
  }),
];

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-source-map",
  plugins: plugins(),
});
