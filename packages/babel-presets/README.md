# babel-preset-react-app

This package is forked from create-react-app's babel-preset-react-app

- [Getting Started]
- Main entry point (index) is the kitchen sink.
- cra.js is the nearest to creat-react-app's implementation (but uses async to promises transforms instead of generators)
- extended.js contains some optionals / nice to have plugins

## Usage Outside of Create React App

use with a babel config e.g `.babelrc` with following contents in the root folder of your project:

```js
{
  "presets": [require.resolve('@create/babel-preset')]
}
```

or just use the select presets you want.

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes that `Object.assign` is available or polyfilled.

## Usage with Flow

Flow is enabled by default. Make sure you have a `.flowconfig` file at the root directory. You can also use the `flow` option on `.babelrc`:

```
{
  "presets": [["react-app", { "flow": true, "typescript": false }]]
}
```

## Usage with TypeScript

TypeScript is enabled by default. Make sure you have a `tsconfig.json` file at the root directory. You can also use the `typescript` option on `.babelrc`:

```
{
  "presets": [["react-app", { "flow": false, "typescript": true }]]
}
```
