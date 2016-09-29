'use strict';

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const path = require('path');
const glob = require('glob');
const error = require('koa-error');

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

  app.use(error({
    engine: 'nunjucks',
    template: path.join(__dirname, '..', 'views', 'error.njk')
  }));

  // Compress
  app.use(compress());

};
