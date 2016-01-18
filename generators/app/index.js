'use strict';
const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting() {
    const done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fantastic ' + chalk.red('generator-pirosikick') + ' generator!'
    ));

    const prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to enable this option?',
      default: true
    }];

    this.prompt(prompts, props => {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    });
  },

  writing() {
    this._copy('dummyfile.txt', 'dummyfile.txt');
  },

  install() {
    this.installDependencies();
  },

  _copy(src, dest) {
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    );
  }
});
