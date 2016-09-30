'use strict';
const views = require('co-views');
const parse = require('co-body');
const router = require('koa-router')();
const messages = [
  { id: 0,
    message: 'Koa next generation web framework for node.js'
  },
  { id: 1,
    message: 'Koa is a new web framework designed by the team behind Express'
  }
];
const render = views(__dirname + '/../views', {
  default: 'njk',
  map: {
    njk: 'nunjucks'
  },
  locals: {
    settings: {
      views: [__dirname + '/../views']
    }
  }
});


router.post('/messages', create);
router.get('/', home);
router.get('/messages', list);
router.get('/messages/:id', fetch);
router.get('/async', delay);
router.get('/promise', promise);

function *home(ctx) {
  this.body = yield render('list', { 'messages': messages });
}

function *list() {
  this.body = yield messages;
}

function *fetch(id) {
  const message = messages[id];
  if (!message) {
    this.throw(404, 'message with id = ' + id + ' was not found');
  }
  this.body = yield message;
}

function *create() {
  const message = yield parse(this);
  const id = messages.push(message) - 1;
  message.id = id;
  this.redirect('/');
}

const asyncOperation = () => callback =>
  setTimeout(
    () => callback(null, 'this was loaded asynchronously and it took 2 seconds to complete'),
    2000);

const returnsPromise = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve('promise resolved after 2 seconds'), 2000));

function *delay() {
  this.body = yield asyncOperation();
}

function *promise() {
  this.body = yield returnsPromise();
}


module.exports = function (app) {
  app.use(router.routes());
};
