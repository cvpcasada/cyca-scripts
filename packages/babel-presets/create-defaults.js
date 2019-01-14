const _ = require('lodash/fp');
const path = require('path');

function createDefaults(opts) {
  const env = require('./env');

  const isEnvDevelopment = env.isEnvDevelopment;
  const isEnvProduction = env.isEnvProduction;

  let defaults = {
    env: {
      targets: {
        browsers: isEnvDevelopment ? [
          'Safari >= 11.1',
          'iOS >= 11.4',
          'Edge >= 16',
          'Chrome >= 66',
          'ChromeAndroid >= 66',
          'Firefox >= 60',
        ] : ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
      },
      exclude: [
        'transform-regenerator',
        'transform-async-to-generator',
        'transform-typeof-symbol',  
      ].filter(Boolean),
      useBuiltIns: false
    },
    runtime: {
      corejs: false,
      helpers: false,
      regenerator: false,
      useESModules: isEnvDevelopment || isEnvProduction
    },
    lodash: { "id": ['lodash', 'ramda', 'rambda', 'recompose', 'polished'] },
    transformDefine: {
      __prod__: isEnvProduction,
      __PRODUCTION__: isEnvProduction,
      __dev__: isEnvDevelopment,
      __DEVELOPMENT__: isEnvDevelopment
    }
  };

  return _.defaultsDeep(defaults, opts || {});

}

module.exports = createDefaults;