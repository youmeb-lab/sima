'use strict';

var util = require('util');
var Transform = require('stream').Transform;

module.exports = Parse;
util.inherits(Parse, Transform);

var parse = Parse.prototype;

function Parse() {
  if (!(this instanceof Parse)) {
    return new Parse();
  }

  Transform.call(this, {
    objectMode: true
  });

  this.lastLine = '';
}

parse._transform = function (chunk, enc, cb) {
  var data = chunk.toString('utf8');
  data = this.lastLine + data;
  this.lastLine = '';

  var lines = data.split(/\r\n|\n/);
  lines.forEach(this.parse.bind(this));

  cb();
};

parse._flush = function (cb) {
  this.parse(this.lastLine);
  this.lastLine = '';
  cb();
};

parse.parse = function (json) {
  try {
    var data = JSON.parse(json);
    this.push(data);
  } catch (e) {}
};
