'use strict';

var os = require('os');
var util = require('util');
var Rotation = require('logrotate-stream');
var PassThrough = require('stream').PassThrough;
var Level = require('./level');
var Parse = require('./parse');
var Filter = require('./filter');
var Prettify = require('./prettify');
var Stringify = require('./stringify');
var slice = Array.prototype.slice;
var write = PassThrough.prototype.write;

module.exports = Sima;
util.inherits(Sima, PassThrough);

var sima = Sima.prototype;

function Sima(name, options) {
  if (!(this instanceof Sima)) {
    return new Sima(name, options);
  }
  options || (options = {});
  options.objectMode = true;
  PassThrough.call(this, options);
  this.name = name || 'app';
  this.levels = {};
}

Sima.parse = Parse;
Sima.filter = Filter;
Sima.rotation = Rotation;
Sima.prettify = Prettify;
Sima.stringify = Stringify;

Sima.level = function (level) {
  return new Level('unknown', level | 0);
};

sima.level = function (name, level) {
  if (arguments.length < 2) {
    level = new Level(name, this.levels[name]);
    return this.pipe(level);
  }

  this.levels[name] = level;
  this[name] = this.log.bind(this, name);
  return this;
};

sima.useDefaultLevels = function () {
  this.level('trace', 10);
  this.level('debug', 20);
  this.level('info', 30);
  this.level('warn', 40);
  this.level('error', 50);
  this.level('fatal', 60);
  return this;
};

sima.log = function () {
  this.write(slice.call(arguments));
  return this;
};

sima.write = function (args, enc, cb) {
  if (!Array.isArray(args)) {
    throw new Error('The first argument must be a String');
  }

  var name = args.shift();
  var level = this.levels[name] | 0;
  
  var data = {
    pid: process.pid,
    hostname: os.hostname(),
    app: this.name,
    name: name,
    upperName: name.toUpperCase(),
    level: level,
    args: args,
    time: new Date(),
    msg: util.format.apply(null, args)
  };

  return write.call(this, data, enc, cb);
};
