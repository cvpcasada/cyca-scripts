'use strict';

module.exports = function(api, opts) {
  let options = {
    // Babel assumes ES Modules, which isn't safe until CommonJS
    // dies. This changes the behavior to assume CommonJS unless
    // an `import` or `export` is present in the file.
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    sourceType: 'unambiguous',
    presetEnv: {
      // Do not transform modules to CJS
      modules: false,
      // Exclude transforms that make all code slower
      exclude: ['transform-typeof-symbol'],
    },
    ...opts,
  };

  return require('./index')(api, options);
};
