'use strict';

var util = require('util');
var Transform = require('stream').Transform;

module.exports = Stringify;
util.inherits(Stringify, Transform);

var stringify = Stringify.prototype;

function Stringify() {
  if (!(this instanceof Stringify)) {
    return new Stringify();
  }
  Transform.call(this, {
    objectMode: true
  });
}

stringify._transform = function (chunk, enc, cb) {
  this.push(JSON.stringify(chunk) + '\n');
  cb();
};
