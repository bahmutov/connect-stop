var isRegExp = require('lodash.isregexp'),
    parseUrl = require('url').parse;

module.exports = function connectStopConfig(options) {
  options = options || {};
  if (options.url) {
    if (!isRegExp(options.url)) {
      throw new Error('url should be a RegExp to check request url, not ' + options.url);
    }
  }

  if (typeof options.response !== 'number' || options.response < 1) {
    throw new Error('Response should be positive HTTP code, not ' + options.response);
  }

  // Return the response for this url, if defined
  function getQueryResponse(url) {
    var response;
    if (options.stopQueryParam) {
      var parsedUrl = parseUrl(url, true);

      if (parsedUrl.query && parsedUrl.query[options.stopQueryParam]) {
        var queryResponse = parseInt(parsedUrl.query[options.stopQueryParam]);
        if (queryResponse > 1) {
          response = queryResponse;
        }
      }
    }

    return response;
  }

  function getUrlResponse(url) {
    if (options.url && options.url.test(url)) {
      return options.response;
    }
  }

  function getResponse(url) {
    var response = getQueryResponse(url);
    if (response === undefined) {
      response = getUrlResponse(url);
    }
    return response;
  }

  return function connectStop(req, res, next) {
    var response = getResponse(req.url);
    if (response && response > 0) {
      if (options.debug) {
        console.log('Connect-stop: sending response %d to url %s', response, req.url);
      }
      res.writeHead(response);
      res.end();
    } else {
      next();
    }
  };
};
