//@ts-check

"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  devtool: "nosources-source-map",

  // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  entry: "./src/index.ts",

  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },

  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },

  // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: "none",

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },

  // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    filename: "index.js",

    libraryTarget: "commonjs2",
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
  },
  target: "web",
};
module.exports = [extensionConfig];
