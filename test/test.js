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

gt.module('connect-stop default options tests', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(stop({
      url: /.*/,
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

gt.async('stop everything', function () {
  request(url)
  .then(function (data) {
    gt.equal(data.statusCode, 500);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.module('connect-stop some resources', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(stop({
      url: /\.stop$/i,
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

gt.async('.stop requests are stop', function () {
  request(url + '/foo.stop')
  .then(function (data) {
    gt.equal(data.statusCode, 500);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('other requests are still fast', function () {
  request(url + '/foo.html')
  .then(function (data) {
    gt.equal(data.statusCode, 200);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.module('connect-stop query parameter', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(stop({
      response: 800,
      stopQueryParam: 'stop'
    }))
    .use(sendMessage);
    this.server = http.createServer(app).listen(port);
  },
  teardownOnce: function () {
    this.server.close();
    delete this.server;
  }
});

gt.async('stop down requests with the query param by the given delay', function () {
  var response = 400;
  request(url + '?stop=' + response)
  .then(function (data) {
    gt.equal(data.statusCode, 400, 'code 200');
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('other requests use default options', function () {
  request(url)
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

gt.module('connect-stop query parameter and url regex', {
  setupOnce: function () {
    var app = connect()
    .use(morgan('dev'))
    .use(stop({
      url: /\.stop$/,
      stopQueryParam: 'stop',
      response: 200
    }))
    .use(sendMessage);
    this.server = http.createServer(app).listen(port);
  },
  teardownOnce: function () {
    this.server.close();
    delete this.server;
  }
});

gt.async('.stop requests with the query param use the query delay', function () {
  var response = 400;
  request(url + '/foo.stop?stop=' + response)
  .then(function (data) {
    gt.equal(data.statusCode, 400, 'code 200');
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('.stop requests without the query param use the default delay', function () {
  request(url + '/foo.stop')
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

gt.async('other requests with the query param use the query delay', function () {
  var response = 400;
  request(url + '?stop=' + response)
  .then(function (data) {
    gt.equal(data.statusCode, 400);
  })
  .catch(function (err) {
    gt.ok(false, err);
  })
  .finally(function () {
    gt.start();
  });
});

gt.async('other requests without the query param are still fast', function () {
  request(url)
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
