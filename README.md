Sima
====

Sima is a super simple JSON logging library. if you are enjoying with `Stream`, you will love it.

```javascript
var sima = Sima('myapp')
  .useDefaultLevels()
  .level('info')
  .pipe(Sima.stringify())
  .pipe(process.stdout);

sima.info('type %s', 'somethings');
```

## Installation

```bash
$ npm i --save sima
$ npm i -g sima # command line tool
```

## How to write data to Sima?

Sima is a `PassThrough` stream, so you can use `write` method directly or `pipe` other `Readable` stream to Sima, for example:

```javascript
sima.write('message');
sima.write('message', callback);
sima.write(['%s', 'message']);
sima.write(['%s', 'message'], callback);

duplex.pipe(sima);
duplex.write('message');
```

## How to output data to console/file?

__We can't `pipe` sima to `process.stdout`__, because sima outputs `Object`s not `String`s:

```javascript
sima.pipe(process.stdout);
```

Therefore, we need to convert Object to string:

```javascript
// json string
sima
  .pipe(Sima.stringify())
  .pipe(process.stdout);

// pretty print 
sima
  .pipe(Sima.prettify({
     // this is optinal
     // syntax: https://github.com/visionmedia/minstache
     format: '[{{time}}] {{upperName}} {{app}}: {{!msg}}'
   }))
  .pipe(process.stdout);
```

## CLI Usage

### Pretty Print

```bash
$ cat sima.log | sima
$ cat sima.log | sima --format '[{{time}}] {{upperName}} {{app}}: {{!msg}}'
```

### Filter/Search

```bash
$ cat sima.log | sima --filter '/hello/.test(data.msg)'
```

## Examples

[./examples](./examples)

## License

MIT: [http://poying.mit-license.org](http://poying.mit-license.org)
