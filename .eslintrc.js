const { resolve } = require('path');
const { readdirSync, lstatSync } = require('fs');
const prettierConfig = require('./.prettierrc');

const PACKAGE_DIR = 'packages/'; // this could be replaced utilizing the globs in package.json's "workpackges" or from the lerna.json config

// get files in packages
const noExtraneousOverrides = readdirSync(resolve(__dirname, PACKAGE_DIR))
  // filter for non-hidden dirs to get a list of packages
  .filter(
    entry =>
      entry.substr(0, 1) !== '.' &&
      lstatSync(resolve(__dirname, PACKAGE_DIR, entry)).isDirectory(),
  )
  // map to override rules pointing to local and root package.json for rule
  .map(entry => ({
    files: [`${PACKAGE_DIR}${entry}/**/*`],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
          packageDir: [__dirname, resolve(__dirname, PACKAGE_DIR, entry)],
        },
      ],
    },
  }));

module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 10,
  },
  overrides: [...noExtraneousOverrides],
  root: true,

  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/eslint-config-airbnb',
    '@vue/prettier',
    '@vue/typescript',
  ],

  plugins: ['prettier', 'import'],

  settings: {
    'import/resolver': {
      node: {},
    },
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prettier/prettier': ['error', { ...prettierConfig }],
  },
};
