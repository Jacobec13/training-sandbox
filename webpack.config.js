const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".mjs"],
    fallback: {
      util: false,
    },
    mainFields: ["browser", "main"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./templates/index.html"),
    }),
  ],
  // watchOptions: {
  //   // for some systems, watching many files can result in a lot of CPU or memory usage
  //   // https://webpack.js.org/configuration/watch/#watchoptionsignored
  //   // don't use this pattern, if you have a monorepo with linked packages
  //   ignored: /node_modules/,
  // },
};
