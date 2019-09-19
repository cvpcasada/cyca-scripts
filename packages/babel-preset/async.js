const { isPluginRequired } = require("@babel/preset-env");
const getTargets = require("@babel/preset-env/lib/targets-parser").default;
const envPlugins = require("@babel/preset-env/data/plugins.json");

function isAsyncRequired(targets) {
  return isPluginRequired(
    getTargets(targets),
    envPlugins["transform-async-to-generator"]
  );
}

// use async to promises transforms,
module.exports = function(ctx, opts) {
  opts = require('./create-defaults')(opts);

  return {
    plugins: [
      isAsyncRequired(opts.env.targets) && require.resolve('babel-plugin-transform-async-to-promises')
    ].filter(Boolean)
  }
}