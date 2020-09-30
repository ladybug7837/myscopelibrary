const config = require('./webpack.config.base');

const ssrConf = {
  ...config,
  target: 'node'
}

module.exports = ssrConf;
