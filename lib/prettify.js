'use strict';

var util = require('util');
var EOL = require('os').EOL;
var minstache = require('minstache');
var Transform = require('stream').Transform;

module.exports = Prettify;
util.inherits(Prettify, Transform);

var prettify = Prettify.prototype;
var format = '[{{time}}] {{upperName}} {{app}}: {{!msg}}';

function Prettify(options) {
  if (!(this instanceof Prettify)) {
    return new Prettify();
  }

  options || (options = {});
  options.objectMode = true;

  Transform.call(this, options);

  this.format = options.format || format;
}

prettify._transform = function (chunk, enc, cb) {
  this.push(minstache(this.format, chunk).trim() + EOL);
  cb();
};
