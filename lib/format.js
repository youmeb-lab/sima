'use strict';

var util = require('util');
var formatRegExp = /%[sdj%]/g;
var slice = Array.prototype.slice;

module.exports = function format() {
  var args = slice.call(arguments);
  var fmt = args.shift();

  if (!util.isString(fmt)) {
    return {
      message: '',
      args: args
    };
  }

  var counter = 0;
  var len = args.length;

  var message = fmt.replace(formatRegExp, function (x) {
    if (x === '%') {
      return '%';
    }
    
    if (counter >= len) {
      return x;
    }

    var val = args[counter];
    counter += 1;

    switch (x) {
      case '%s':
        return String(val);
        break;
      case '%d':
        return Number(val);
        break;
      case '%j':
        try {
          return JSON.stringify(val);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });

  args = args.slice(counter);

  switch (args.length) {
    case 0:
      args = null;
      break;
    case 1:
      args = args[0];
    default:
      args = args;
      break;
  }

  return {
    message: message,
    args: args
  };
};
