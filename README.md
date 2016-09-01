# gulp-http-put 

[![NPM](https://nodei.co/npm/gulp-http-put.png?downloads=true&downloadRank=true&stars=true)][npm-url][![NPM](https://nodei.co/npm-dl/gulp-http-put.png?height=3&months=6)][npm-url]

[![npm](https://img.shields.io/npm/v/gulp-http-put.svg)][npm-url] [![npm](https://img.shields.io/npm/dm/gulp-http-put.svg)][npm-url] [![npm](https://david-dm.org/gjurgens/gulp-http-put.svg)][npm-url] [![npm](https://img.shields.io/npm/l/gulp-http-put.svg)][npm-url]

[![bitHound Overall Score](https://www.bithound.io/github/gjurgens/gulp-http-put/badges/score.svg)](https://www.bithound.io/github/gjurgens/gulp-http-put) [![Inline docs](http://inch-ci.org/github/gjurgens/gulp-http-put.svg?branch=master)](http://inch-ci.org/github/gjurgens/gulp-http-put) [![Build Status](https://travis-ci.org/gjurgens/gulp-http-put.svg?branch=master)](https://travis-ci.org/gjurgens/gulp-http-put) [![Coverage Status](https://coveralls.io/repos/github/gjurgens/gulp-http-put/badge.svg?branch=master)](https://coveralls.io/github/gjurgens/gulp-http-put?branch=master)

[![GitHub stars](https://img.shields.io/github/stars/gjurgens/gulp-http-put.svg?style=social&label=Star)](https://github.com/gjurgens/gulp-http-put/stargazers) [![GitHub watchers](https://img.shields.io/github/watchers/gjurgens/gulp-http-put.svg?style=social&label=Watch)](https://github.com/gjurgens/gulp-http-put/subscription)

[npm-url]: https://npmjs.org/package/gulp-http-put
Makes an HTTP PUT for each file on the selected URL. I allows to define custon options that will be passed to [request](https://github.com/request/request) module.

## Features

* Custom PUT params via [request](https://github.com/request/request) module
* Support callback method
* Raises error when failing

## Installation

```bash
$ npm i gulp-http-put
```

## Examples

* Put with custom options and callback

```js
var put = require("gulp-http-put");

gulp.task("put",function(){
    gulp.src("src/**/*.js")
        .pipe(put("http://www.mysite.com/",
			{
				"headers": {
                	"Custom-Header": "This is a custom HTTP header"
                },
                "callback": function(err, response, body) {
					if(!err) {
					    //yor code
					}
				}
			}
        ));
});
```


## Options Format
Options used by [request](https://github.com/request/request) module. For example:
* **options.callback** Callback function called with `error`, `response`, `body` params.
* **options.headers** Headers added to the request HTTP PUT message