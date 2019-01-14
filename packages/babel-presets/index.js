'use strict';

module.exports = function(ctx, opts) {
  return {
    presets: [
      [require.resolve('./cra'), opts],
      [require.resolve('./extended'), opts],
    ],
  };
};
