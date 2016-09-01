"use strict";
const request = require("request");
const urlHelper = require("url");
const path = require("path");
const obj = require("through2").obj;
const pluginError = require("gulp-util").PluginError;
const PLUGIN_NAME = "gulp-http-put";
/**
 * @param url {String}
 * @param options {Object}
 * @return {Function}
 * @example
 * gulp.src("file.tar.gz").pipe(put("http://mysite.com/"));
 */
module.exports = (url, _options)=> {
    let options = _options || {};
    let put = request.defaults(options).put;
    if (!url || typeof(url) !== "string") {
        throw new pluginError(PLUGIN_NAME, 'Invalid URL format.');
    }
    return obj((file, encoding, callback)=> {
        if (!file) {
            throw new pluginError(PLUGIN_NAME, 'Missing file or files.');
        }

        let urlPath = urlHelper.resolve(url, path.relative(file.cwd,file.path));
        if (file.isBuffer()) {
            file.pipe(put(urlPath,options))
                .on("error",(err) => {
                    callback(err, file);
                })
                .on("end",() => {
                    callback(null, file);
                });
        } else {
            callback((new pluginError(PLUGIN_NAME, 'Invalid file: ' + file.path)), file);
        }
    })
};