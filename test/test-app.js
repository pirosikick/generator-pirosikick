'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('pirosikick:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      'gulpfile.js',
      'webpack.config.js',
      '.jshintrc',
      'app/index.html',
      'src/client.jsx',
      'src/components/Application.jsx',
      '__tests__/Application-test.js',
      'preprocessor.js'
    ]);
  });
});
