'use strict';

var Sima = require('../lib');
var sima = new Sima('simple');

sima.useDefaultLevels();

sima.on('error', function (e) {
  console.log(e.stack);
});

sima.level('info')
  .pipe(Sima.prettify())
  .pipe(process.stdout);

sima.trace('trace', { json: 'object' });
sima.debug('debug %s', 'string');
sima.info('info');
sima.error('error');
