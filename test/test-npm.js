'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('Pirosikick:npm', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../npm'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        packageName: 'awesome-cool-app',
        description: 'This package is awesome cool app'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
        'package.json'
      , 'index.js'
      , 'src/index.js'
      , 'test/index.js'
      , '.gitignore'
      , '.yo-rc.json'
    ]);
  });
});
