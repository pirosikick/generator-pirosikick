'use strict';
const Base = require('../base');

module.exports = Base.extend({
  initializing() {
    this.option('skip-install');
  },

  prompting() {
    this._setPrompt(this.async());
  },

  writing() {
    let json = this._packageJSON(require('./templates/package.json'));
    this._write('package.json', JSON.stringify(json, null, 2));
    this._copy('_gitignore', '.gitignore');
    this._copy('_travis.yml', '.travis.yml');
    this._copy('_eslintrc.json', '.eslintrc.json');
    this._copy('gulpfile.js');
    this._copy('src/index.js');
    this._copy('test/index.js');
    this._copy('README.md');
  },

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
