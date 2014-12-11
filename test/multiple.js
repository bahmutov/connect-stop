/*global gt:false*/
var connect = require('connect');
var q = require('q');
var request = q.denodeify(require('request'));
var http = require('http');
var stop = require('..');
var morgan = require('morgan');

var port = 3440;
var msg = 'hello world';
var url = 'http://localhost:' + port + '/something';

function sendMessage(req, res) {
  res.end(msg);
}

gt.module('multiple connect-stop', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(stop({
      url: /\.stop$/i,
      response: 404
    }))
    .use(stop({
      url: /\.very-stop$/i,
      response: 500
    }))
    .use(sendMessage);
    this.server = http.createServer(app).listen(port);
  },
  teardownOnce: function () {
    this.server.close();
    delete this.server;
  }
});

gt.async('.stop requests get 404', function () {
  request(url + '/foo.stop')
  .then(function (response) {
    gt.equal(response.statusCode, 404);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('.very-stop requests are 500', function () {
  request(url + '/foo.very-stop')
  .then(function (response) {
    gt.equal(response.statusCode, 500);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('other requests are 200', function () {
  request(url + '/foo.html')
  .then(function (response) {
    gt.equal(response.statusCode, 200);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});
