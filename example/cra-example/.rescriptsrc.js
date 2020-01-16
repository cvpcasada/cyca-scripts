require('dotenv').config();

const { getPaths, edit } = require('@rescripts/utilities');
const fs = require('fs');

module.exports = [
  // babel configuration
  {
    webpack: config =>
      edit(
        babelConfig => {
          // module sources + node_modules
          if (babelConfig.exclude) {
            babelConfig.options.presets = [
              require.resolve('@cyca/babel-preset/dependencies'),
            ];
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
  },
];
