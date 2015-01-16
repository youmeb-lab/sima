'use strict';

var util = require('util');
var Transform = require('stream').Transform;

module.exports = Filter;
util.inherits(Filter, Transform);

var filter = Filter.prototype;

function Filter(condition) {
  if (!(this instanceof Filter)) {
    return new Filter(condition);
  }

  Transform.call(this, {
    objectMode: true
  });
  
  this.condition = condition;
}

filter._transform = function (data, enc, cb) {
  if (this.condition(data)) {
    this.push(data);
  }
  cb();
};
