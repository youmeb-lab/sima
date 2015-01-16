'use strict';

var Sima = require('../../lib');
var sima = new Sima('cli-example');

sima.useDefaultLevels();

sima.info('info');
sima.info('hello');
sima.error('error T T');

sima
  .pipe(Sima.stringify())
  .pipe(Sima.rotation({
    file: './test.log',
    size: '100k',
    keep: 3
  }));
