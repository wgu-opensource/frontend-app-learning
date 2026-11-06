// Babel config for building the distributable library (src -> dist) consumed by
// openedx-mfe-learning as @edx/frontend-app-learning#<release>-dist.
//
// Extends frontend-build's TypeScript babel config (default preset + @babel/preset-typescript)
// and adds module-resolver so the Sumac-era "@src/*" path alias (defined in tsconfig.json)
// is rewritten to relative paths in the emitted dist/ — otherwise consumers can't resolve it.
// eslint-disable-next-line import/extensions -- explicit .js required to resolve the file inside the package
const config = require('@openedx/frontend-build/config/babel-typescript.config.js');

config.plugins.push([
  'module-resolver',
  {
    root: ['./src'],
    alias: { '@src': './src' },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
]);

module.exports = config;
