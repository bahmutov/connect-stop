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
