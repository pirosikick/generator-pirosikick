'use strict';
const path = require('path');
const yeoman = require('yeoman-generator');

const username = 'pirosikick';

module.exports = yeoman.generators.Base.extend({
  initializing() {
    this.option('skip-install');
  },

  prompting() {
    const done = this.async();

    const prompts = [
      {
        type: 'input',
        name: 'userName',
        message: 'Who are you?',
        default: username
      },
      {
        type: 'input',
        name: 'projectName',
        message: 'What\'s your project name?',
        default: path.basename(process.cwd())
      }
    ];

    this.prompt(prompts, props => {
      this.props = props;
      this.githubURL = `https://github.com/${props.userName}/${props.projectName}`;
      done();
    });
  },

  writing() {
    let packageJSON = Object.assign(require('./templates/package.json'), {
      name: this.props.projectName,
      description: 'SOME DESCRIPTION',
      bugs: {
        url: `${this.githubURL}/issues`
      },
      homepage: this.githubURL,
      repository: {
        type: 'git',
        url: `${this.githubURL}.git`
      }
    });

    this._write('package.json', JSON.stringify(packageJSON, null, 2));
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
      this.installDependencies();
    }
  },

  _write(dest, contents) {
    this.fs.write(this.destinationPath(dest), contents);
  },

  _copy(src, dest) {
    if (!dest) {
      dest = src;
    }
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }
});
