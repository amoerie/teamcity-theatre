const path = require("path");

module.exports = function () {
  return {
    stats: {
      hash: false,
      version: false,
      assets: true
    },
    entry: {
      "dashboard": "./Views/Home/dashboard.js",
      "settings": "./Views/Home/settings.js"
    },
    output: {
      path: path.resolve(__dirname, "wwwroot/js"),
      filename: "[name].js"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            chunks: "all"
          }
        }
      }
    },
    performance: {
      maxEntrypointSize: 524288, // 512 kb
      maxAssetSize: 524288 // // 512 kb
    }
  };
};