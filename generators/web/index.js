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

## License

[MIT](http://${this.props.userName}.mit-License.org/)
`);

    this._copy('_gitignore', '.gitignore');
    this._copy('gulpfile.js');
    this._copy('webpack.config.js');
    this._copy('src/client.js');
    this._copy('src/styles/main.css');
    this._copy('src/styles/_hello.css');
    this._copy('public/index.html');
    this._copy('test/index.js');
  },

  install() {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});
