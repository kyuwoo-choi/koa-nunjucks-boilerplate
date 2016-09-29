'use strict';

const koa = require('koa');
const app = module.exports = koa();

require('./setup/koa')(app);

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
