'use strict';

var util = require('util');
var Filter = require('./filter');

module.exports = Level;
util.inherits(Level, Filter);

var level = Level.prototype;

function Level(name, level) {
  Filter.call(this, condition(level));
  this.name = name;
  this.level = level | 0;
}

function condition(level) {
  return function (data) {
    return data.level >= level;
  };
}
