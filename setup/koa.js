'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const glob = require('glob');

module.exports = function(app) {
  // Logger
  app.use(logger());
  let controllers = glob.sync(path.resolve(__dirname, '../controllers/*.js'));

  // Controllers
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  // Serve static files
  app.use(serve(path.join(__dirname, '..', 'public')));

  // Compress
  app.use(compress());

};
