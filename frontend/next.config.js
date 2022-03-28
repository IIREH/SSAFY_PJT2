const Dotenv = require('dotenv-webpack');
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(new Dotenv({ silent: true }));
    config.resolve.alias = Object.assign({}, config.resolve.alias, {
      'react-pdf': 'react-pdf/dist/entry.noworker.js',
    });
    return config;
  },
};
