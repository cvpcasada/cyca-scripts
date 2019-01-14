"use strict";

const path = require("path");

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Preset react-app: '${name}' option must be a boolean.`);
  }

  return value;
};

module.exports = function(api, opts) {
  const env = require("./env");
  opts = require("./create-defaults")(opts);

  let isEnvDevelopment = env.isEnvDevelopment;
  let isEnvProduction = env.isEnvProduction;
  let isEnvTest = env.isEnvTest;

  let useESModules = validateBoolOption(
    "useESModules",
    opts.useESModules,
    isEnvDevelopment || isEnvProduction
  );
  let isFlowEnabled = validateBoolOption("flow", opts.flow, true);
  let isTypeScriptEnabled = validateBoolOption(
    "typescript",
    opts.typescript,
    true
  );
  let areHelpersEnabled = validateBoolOption("helpers", opts.helpers, true);
  let useAbsoluteRuntime = validateBoolOption(
    "absoluteRuntime",
    opts.absoluteRuntime,
    true
  );

  let absoluteRuntimePath = undefined;
  if (useAbsoluteRuntime) {
    absoluteRuntimePath = path.dirname(
      require.resolve("@babel/runtime/package.json")
    );
  }

  if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
    throw new Error(
      "Using `babel-preset-react-app` requires that you specify `NODE_ENV` or " +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(env) +
        "."
    );
  }

  return {
    // Babel assumes ES Modules, which isn't safe until CommonJS
    // dies. This changes the behavior to assume CommonJS unless
    // an `import` or `export` is present in the file.
    // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
    ...(opts.sourceType ? { sourceType: opts.sourceType } : {}),
    presets: [
      isEnvTest && [
        // ES features necessary for user's Node version
        require("@babel/preset-env").default,
        {
          targets: {
            node: "current"
          },
          modules: opts.env.modules,
          exclude: opts.env.exclude
        }
      ],
      (isEnvProduction || isEnvDevelopment) && [
        // Latest stable ECMAScript features
        require("@babel/preset-env").default,
        {
          targets: {
            browsers: opts.env.targets.browsers
          },
          // Users cannot override this behavior because this Babel
          // configuration is highly tuned for ES5 support
          ignoreBrowserslistConfig: true,
          // If users import all core-js they're probably not concerned with
          // bundle size. We shouldn't rely on magic to try and shrink it.
          useBuiltIns: false,
          // Do not transform modules to CJS
          modules: false,
          // Exclude transforms that make all code slower
          exclude: opts.env.exclude
        }
      ],

      [require.resolve("./async"), opts],

      [
        require("@babel/preset-react").default,
        {
          // Adds component stack to warning messages
          // Adds __self attribute to JSX which React will use for some warnings
          development: isEnvDevelopment || isEnvTest,
          // Will use the native built-in instead of trying to polyfill
          // behavior for any plugins that require one.
          useBuiltIns: true
        }
      ],
      isTypeScriptEnabled && [require("@babel/preset-typescript").default]
    ].filter(Boolean),
    plugins: [
      // Strip flow types before any other transform, emulating the behavior
      // order as-if the browser supported all of the succeeding features
      // https://github.com/facebook/create-react-app/pull/5182
      // We will conditionally enable this plugin below in overrides as it clashes with
      // @babel/plugin-proposal-decorators when using TypeScript.
      // https://github.com/facebook/create-react-app/issues/5741
      isFlowEnabled && [
        require("@babel/plugin-transform-flow-strip-types").default,
        false
      ],
      // Experimental macros support. Will be documented after it's had some time
      // in the wild.
      require("babel-plugin-macros"),
      // Necessary to include regardless of the environment because
      // in practice some other transforms (such as object-rest-spread)
      // don't work without it: https://github.com/babel/babel/issues/7215
      require("@babel/plugin-transform-destructuring").default,
      // Turn on legacy decorators for TypeScript files
      isTypeScriptEnabled && [
        require("@babel/plugin-proposal-decorators").default,
        false
      ],
      // class { handleClick = () => { } }
      // Enable loose mode to use assignment instead of defineProperty
      // See discussion in https://github.com/facebook/create-react-app/issues/4263
      [
        require("@babel/plugin-proposal-class-properties").default,
        {
          loose: true
        }
      ],
      // The following two plugins use Object.assign directly, instead of Babel's
      // extends helper. Note that this assumes `Object.assign` is available.
      // { ...todo, completed: true }
      [
        require("@babel/plugin-proposal-object-rest-spread").default,
        {
          useBuiltIns: true
        }
      ],

      // Polyfills the runtime needed for async/await, generators, and friends
      // https://babeljs.io/docs/en/babel-plugin-transform-runtime
      [
        require("@babel/plugin-transform-runtime").default,
        {
          corejs: false,
          helpers: areHelpersEnabled,
          regenerator: true,
          // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
          // We should turn this on once the lowest versi n of Node LTS
          // supports ES Modules.
          useESModules,
          // Undocumented option that lets us encapsulate our runtime, ensuring
          // the correct version is used
          // https://github.com/babel/babel/blob/090c364a90fe73d36a30707fc612ce037bdbbb24/packages/babel-plugin-transform-runtime/src/index.js#L35-L42
          absoluteRuntime: absoluteRuntimePath
        }
      ],
      isEnvProduction && [
        // Remove PropTypes from production build
        require("babel-plugin-transform-react-remove-prop-types").default,
        {
          removeImport: true
        }
      ],
      // Adds syntax support for import()
      require("@babel/plugin-syntax-dynamic-import").default,
      isEnvTest &&
        // Transform dynamic import to require
        require("babel-plugin-dynamic-import-node")
    ].filter(Boolean),
    overrides: [
      isFlowEnabled && {
        exclude: /\.tsx?$/,
        plugins: [require("@babel/plugin-transform-flow-strip-types").default]
      },
      isTypeScriptEnabled && {
        test: /\.tsx?$/,
        plugins: [
          [
            require("@babel/plugin-proposal-decorators").default,
            { legacy: true }
          ]
        ]
      }
    ].filter(Boolean)
  };
};
