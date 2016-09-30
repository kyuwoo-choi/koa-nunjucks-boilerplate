'use strict';

const ENV = process.env.NODE_ENV || 'development';

let config = {
  development: {},
  staging: {},
  production: {}
};

//PORT
config.development.port =
  config.staging.port =
  config.production.port = process.env.PORT || 3000;

module.exports = config[ENV];
