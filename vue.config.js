const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
module.exports = {
  publicPath: "./",
  configureWebpack: {
    optimization: {
      splitChunks: false, // makes there only be 1 js file - leftover from earlier attempts but doesn't hurt
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html", // the output file name that will be created
        template: "public/index.html", // this is important - a template file to use for insertion
        inlineSource: ".(js|css)$", // embed all javascript and css inline
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],
  },
};
