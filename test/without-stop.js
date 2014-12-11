/*global gt:false*/
var connect = require('connect');
var q = require('q');
var request = q.denodeify(require('request'));
var http = require('http');
var morgan = require('morgan');

var port = 3440;
var msg = 'hello world';
function sendMessage(req, res) {
  res.end(msg);
}

gt.module('without connect-slow tests', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(sendMessage);
    this.server = http.createServer(app).listen(port);
  },
  teardownOnce: function () {
    this.server.close();
    delete this.server;
  }
});

gt.async('simple test', function () {
  request('http://localhost:' + port + '/test.js')
  .then(function (data) {
    gt.equal(data.statusCode, 200, 'code 200');
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});
