install:

```
npm install {%= name %} --save
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

### Related projects

* [connect-pause](https://github.com/flesler/connect-pause) - extremely simple delay
* [connect-slow](https://github.com/flesler/connect-slow) - delays selected requests
