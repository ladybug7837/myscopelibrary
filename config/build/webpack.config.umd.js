const config = require('./webpack.config.base');

const umdConf = {
  ...config,
  externals: [],
  output: {
    libraryTarget: 'umd',
  },
};

// Add this babel plugin for umd format
umdConf.module.rules[0].use[0].options.plugins = [
  '@babel/plugin-transform-runtime',
];

module.exports = umdConf;
