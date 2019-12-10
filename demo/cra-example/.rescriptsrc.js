require('dotenv').config();

const { getPaths, edit } = require('@rescripts/utilities');
const fs = require('fs');
const env = require('@cyca/babel-preset/env');

module.exports = [
  // babel configuration
  {
    webpack: config =>
      edit(
        babelConfig => {
          // module sources + node_modules
          if (babelConfig.exclude) {
            babelConfig.options.presets = [
              require.resolve('@cyca/babel-preset/dependencies')
            ]

            // babelConfig.options.presets = [
            //   [
            //     require.resolve('babel-preset-react-app'),
            //     // {
            //     //   sourceType: 'unambiguous',
            //     //   ...(env.isEnvTest ? { env: { modules: false } } : {}),
            //     //   includePropTypes: true,
            //     //   helpers: true,
            //     // },
            //   ],
            // ];
          }
          // own source
          else {
            babelConfig.options.presets = [
              require.resolve('@cyca/babel-preset'),
            ];
          }

          return babelConfig;
        },
        getPaths(
          path => path.loader && path.loader.includes('babel-loader'),
          config
        ),
        config
      ),
  }
];
