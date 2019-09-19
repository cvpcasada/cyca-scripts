module.exports = function(ctx, opts) {
  const env = require('./env');
  opts = require('./create-defaults')(opts, env.env);
  const isEnvDevelopment = env.isEnvDevelopment;
  const isEnvProduction = env.isEnvProduction;
  const isEnvTest = env.isEnvTest;

  return {
    plugins: [
      [
        require.resolve('babel-plugin-styled-components'),
        {
          ssr: true,
          ...(isEnvDevelopment ? { displayName: true, preprocess: false } : {}),
        },
      ],
      isEnvProduction && [require.resolve('babel-plugin-lodash'), opts.lodash],
      require.resolve('@babel/plugin-proposal-optional-catch-binding'),
      [require.resolve('babel-plugin-transform-define'), opts.transformDefine],
    ].filter(Boolean),
  };
};