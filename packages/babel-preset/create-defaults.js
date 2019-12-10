const _ = require('lodash/fp');

function createDefaults(opts) {
  const env = require('./env');

  let defaults = {
    lodash: { id: ['lodash', 'ramda', 'rambda', 'recompose', 'polished'] },
    transformDefine: {
      __prod__: env.isEnvProduction,
      __PRODUCTION__: env.isEnvProduction,
      __dev__: env.isEnvDevelopment,
      __DEVELOPMENT__: env.isEnvDevelopment,
    },
  };

  return _.defaultsDeep(defaults, opts || {});
}

module.exports = createDefaults;
