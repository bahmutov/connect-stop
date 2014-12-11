# connect-stop v0.2.1

> Middleware to stop answering requests based on request url, useful to diagnose website behavior based on server errors

[![NPM][connect-stop-icon] ][connect-stop-url]

[![Build status][connect-stop-ci-image] ][connect-stop-ci-url]
[![dependencies][connect-stop-dependencies-image] ][connect-stop-dependencies-url]
[![devdependencies][connect-stop-devdependencies-image] ][connect-stop-devdependencies-url]

[connect-stop-icon]: https://nodei.co/npm/connect-stop.png?downloads=true
[connect-stop-url]: https://npmjs.org/package/connect-stop
[connect-stop-ci-image]: https://travis-ci.org/bahmutov/connect-stop.png?branch=master
[connect-stop-ci-url]: https://travis-ci.org/bahmutov/connect-stop
[connect-stop-dependencies-image]: https://david-dm.org/bahmutov/connect-stop.png
[connect-stop-dependencies-url]: https://david-dm.org/bahmutov/connect-stop
[connect-stop-devdependencies-image]: https://david-dm.org/bahmutov/connect-stop/dev-status.png
[connect-stop-devdependencies-url]: https://david-dm.org/bahmutov/connect-stop#info=devDependencies



```js
var connect = require('connect');
var http = require('http');
var stop = require('connect-stop');
var app = connect()
    .use(connect.logger('dev'))
    .use(stop({
        url: /\.jpg$/i,
        response: 404
    }))
    .use(connect.static('public'));
http.createServer(app).listen(4000);
$ curl http://localhost:4000/index.html  // 200
$ curl http://localhost:4000/foto.jpg    // 404
```

Works with [Connect](http://www.senchalabs.org/connect/),
[Express](http://expressjs.com/), [turtle-run](https://github.com/bahmutov/turtle-run). 



## Why?

Controlled server-side responses allow to debug the website behavior.

install:

```
npm install connect-stop --save
```

stop every requst

```js
var stop = require('connect-stop');
var app = connect()
    .use(stop({
        url: /.*/,
        response: 500
    }))
    ...
```
Stop jpeg requests, let everything else through

```js
var stop = require('connect-stop');
var app = connect()
    .use(stop({
        url: /\.[jpg|jpeg]$/i,
        response: 404
    }))
    ...
```

You can see console log of stopped urls by passing option `debug`

```js
stop({
    url: /\.[jpg|jpeg]$/i,
    response: 500
    debug: true
})
```

#### Related projects

* [connect-pause](https://github.com/flesler/connect-pause) - extremely simple delay
* [connect-slow](https://github.com/flesler/connect-slow) - delays selected requests



### Small print

Author: Gleb Bahmutov &copy; 2014

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/connect-stop/issues) on Github



## MIT License

Copyright (c) 2014 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.



