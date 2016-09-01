'use strict';
const fs = require('fs');
const path = require('path');
const put = require('../');
const gulp = require('gulp');
const expect = require('chai').expect;
const describe = require('mocha').describe;
const it = require('mocha').it;
const before = require('mocha').before;
const after = require('mocha').after;
const sinon = require('sinon');
const nock = require('nock');
const http = require('http');

describe('gulp-http-put', () => {
    const filePath = path.join('temp', 'file.tmp');

    before(done=> {
        fs.mkdir('temp', ()=> {
            fs.writeFile(filePath, 'gulp', done);
        });
    });

    after(done=> {
        fs.unlink(filePath, ()=> {
            fs.rmdir('temp', done);
        });
    });

    it('should throw, when url is undefined.', ()=> {
        expect(put).to.throw(Error);
    });
    it('should throw, when file is missing.', ()=> {
        gulp.src('undefined.file')
            .pipe(put('https://npmjs.com', undefined))
            .on('error', err=> {
                expect(err).to.be.an('error');
            });
    });
    it('should return error on callback, when domain unreachable.', done=> {
        gulp.src(filePath)
            .pipe(put('http://undefineddomain.com', {
                callback: err=> {
                    expect(err).to.be.an('error');
                    done();
                }
            }));
    });
    it('should throw, when domain unreachable.', done=> {
        gulp.src(filePath)
            .pipe(put('http://undefineddomain.com'))
            .on('error', err=> {
                expect(err).to.be.an('error');
                done();
            });
    });

    it('should send the content applying options', done=> {
        nock('http://fake.site.noc')
            .put("/temp/file.tmp")
            .reply(200,"ok");

        sinon.spy(http, "request");

        gulp.src(filePath)
            .pipe(put('http://fake.site.noc',{
                "headers": {
                    "custom": "custom header"
                }
            }))
            .on("finish",function(){
                expect(http.request.calledOnce).to.equals(true);
                expect(http.request.args[0][0].method).to.equals("PUT");
                expect(http.request.args[0][0].headers.custom).to.equals("custom header");
                http.request.restore();
                nock.cleanAll();
                done();
            });
    });

    it('should call callback funtion with error, request, ando body params', done=> {
        nock('http://fake.site.noc')
            .put("/temp/file.tmp")
            .reply(200,"this is the body");

        sinon.spy(http, "request");

        gulp.src(filePath)
            .pipe(put('http://fake.site.noc',{
                "headers": {
                    "custom": "custom header"
                },
                "callback": function(err, response, body) {
                    expect(http.request.calledOnce).to.equals(true);
                    expect(err).to.equals(null);

                    expect(response).to.be.an("object");
                    expect(response).to.be.instanceOf(http.IncomingMessage);
                    expect(response).to.have.property("statusCode",200);

                    expect(body).to.equals("this is the body");

                    http.request.restore();
                    nock.cleanAll();
                    done();
                }
            }));
    });
});