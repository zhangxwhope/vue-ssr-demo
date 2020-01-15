const nodeExternals = require("webpack-node-externals");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");

module.exports = {
  configureWebpack: () => {
    if (process.env.WEBPACK_TARGET === "node") {
      return {
        entry: "./src/entry-server.js",
        target: "node",
        devtool: "source-map",
        output: {
          libraryTarget: "commonjs2"
        },
        externals: nodeExternals({
          whitelist: /\.css$/
        }),
        plugins: [new VueSSRServerPlugin()]
      };
    } else {
      return {
        entry: "./src/entry-client.js",
        plugins: [new VueSSRClientPlugin()]
      };
    }
  },
  chainWebpack: config => {
    config.optimization.splitChunks(undefined);
  },
  css: {
    extract: false
  }
};
