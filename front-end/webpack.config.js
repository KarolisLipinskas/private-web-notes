const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
  devServer: {
    server: {
      type: "https",
      options: {
        key: fs.readFileSync(path.resolve(__dirname, "./ssl/key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "./ssl/cert.pem")),
      },
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: "/api",
        target: "http://localhost:3000",
        pathRewrite: { "^/api": "" },
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
