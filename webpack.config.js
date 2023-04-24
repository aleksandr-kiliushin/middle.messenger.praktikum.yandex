/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 4000,
  },
  devtool: "source-map",
  entry: "./src/index.ts",
  mode: process.env.MODE,
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.handlebars$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.EnvironmentPlugin({ MODE: process.env.MODE }),
    new webpack.SourceMapDevToolPlugin({ filename: "[file].map[query]" }),
    new HtmlWebpackPlugin({ template: "static/index.html" }),
  ],
  resolve: {
    alias: {
      handlebars: "handlebars/dist/handlebars.js",
      "@api": path.resolve(process.cwd(), "src/api"),
      "@constants": path.resolve(process.cwd(), "src/constants"),
      "@components": path.resolve(process.cwd(), "src/components"),
      "@controllers": path.resolve(process.cwd(), "src/controllers"),
      "@cypress": path.resolve(process.cwd(), "cypress"),
      "@pages": path.resolve(process.cwd(), "src/pages"),
      "@store": path.resolve(process.cwd(), "src/store.ts"),
      "@types": path.resolve(process.cwd(), "src/types.ts"),
      "@utils": path.resolve(process.cwd(), "src/utils"),
    },
    extensions: [".js", ".ts"],
  },
}
