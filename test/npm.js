'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-pirosikick:npm', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/npm'))
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
      '.travis.yml',
      '.eslintrc.json',
      'gulpfile.js',
      'src/index.js',
      'test/index.js',
      'README.md'
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
