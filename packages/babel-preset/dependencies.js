'use strict';

module.exports = function (api, opts) {
  if (!opts) {
    opts = {};
  }

  // This is similar to how `env` works in Babel:	
  // https://babeljs.io/docs/usage/babelrc/#env-option	
  // We are not using `env` because it’s ignored in versions > babel-core@6.10.4:	
  // https://github.com/babel/babel/issues/4539	
  // https://github.com/facebook/create-react-app/issues/720	
  // It’s also nice that we can enforce `NODE_ENV` being specified.	
  let env = process.env.BABEL_ENV || process.env.NODE_ENV;

  opts = {
    // Babel assumes ES Modules, which isn't safe until CommonJS	
    // dies. This changes the behavior to assume CommonJS unless	
    // an `import` or `export` is present in the file.	
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    sourceType: 'unambiguous', 
    presetEnv: {
      // Do not transform modules to CJS	
      modules: false,
      // Exclude transforms that make all code slower	
      exclude: ['transform-typeof-symbol']
    },
    ...opts
  }

  return require('./create')(api, opts, env);
};
