/* global gt:false */
var stop = require('..');

gt.module('connect-stop basics');

gt.test('basic info', function () {
  gt.func(stop, 'connect-stop is a function');
});

gt.test('url should be a regexp', function () {
  gt.throws(function () {
    stop({
      url: '.html'
    });
  }, 'AssertionError');
});

gt.test('response should be positive', function () {
  gt.throws(function () {
    stop({
      response: -100
    });
  }, 'AssertionError');
});

gt.test('valid parameters', function () {
  var fn = stop({
    url: /\.jpg$/i,
    response: 404
  });
  gt.arity(fn, 3, 'middleware expects 3 arguments');
});
