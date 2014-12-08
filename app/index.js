'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html')
      );
      this.fs.copy(
        this.templatePath('client.jsx'),
        this.destinationPath('src/client.jsx')
      );
      this.fs.copy(
        this.templatePath('Application.jsx'),
        this.destinationPath('src/components/Application.jsx')
      );
      this.fs.copy(
        this.templatePath('Application-test.js'),
        this.destinationPath('__tests__/Application-test.js')
      );
      this.fs.copy(
        this.templatePath('preprocessor.js'),
        this.destinationPath('preprocessor.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
