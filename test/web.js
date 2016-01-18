'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-generator').test;

describe('generator-pirosikick:web', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/web'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        userName: 'pirosikick',
        projectName: 'example'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.gitignore',
      'gulpfile.js',
      'webpack.config.js',
      'src/client.js',
      'src/styles/main.css',
      'src/styles/_hello.css',
      'public/index.html',
      'test/index.js'
    ]);
  });

  it('creates package.json as intended', function () {
    const githubURL = 'https://github.com/pirosikick/example';
    assert.JSONFileContent('package.json', {
      name: 'example',
      description: 'SOME DESCRIPTION',
      bugs: {
        url: `${githubURL}/issues`
      },
      homepage: githubURL,
      repository: {
        type: 'git',
        url: `${githubURL}.git`
      }
    })
  });
});
