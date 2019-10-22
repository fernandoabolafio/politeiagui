const path = require("path");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

function addScriptAttr(config) {
  if (process.env.NODE_ENV === "production") {
    config.plugins.push(
      new ScriptExtHtmlWebpackPlugin({
        custom: {
          test: /\.js$/,
          attribute: "nonce",
          value: "{{ cspNonce }}"
        }
      })
    );
  }
}

module.exports = {
  webpack: function(config) {
    addScriptAttr(config);
    config.resolve = {
      ...config.resolve,
      alias: { src: path.resolve(__dirname, "src") }
    };
    return config;
  }
};
