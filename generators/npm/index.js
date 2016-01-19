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
    this._write('README.md', `
# ${this.props.projectName}

[![npm version](https://badge.fury.io/js/${this.props.projectName}.svg)](http://badge.fury.io/js/${this.props.projectName})
[![david](https://david-dm.org/pirosikick/${this.props.projectName}.svg)](https://david-dm.org/pirosikick/${this.props.projectName})
[![Build Status](https://travis-ci.org/pirosikick/${this.props.projectName}.svg)](https://travis-ci.org/pirosikick/${this.props.projectName})

SOME DESCRIPTION

## License

[MIT](http://${this.props.userName}.mit-license.org/)
`);

    this._copy('_gitignore', '.gitignore');
    this._copy('_travis.yml', '.travis.yml');
    this._copy('_eslintrc.json', '.eslintrc.json');
    this._copy('gulpfile.js');
    this._copy('src/index.js');
    this._copy('test/index.js');
  },

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
