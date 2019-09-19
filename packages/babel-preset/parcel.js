module.exports = function(ctx, opts) {
  return {
    presets: [[require.resolve("./index"), { absoluteRuntime: false, ...opts }]]
  };
};
