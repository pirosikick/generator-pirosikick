'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
  },

  configuring: {
    save: function () {
      this.config.save();
    }
  },

  writing: {
    app: function () {
      this._copyEach({
          '_package.json': 'package.json'
        , '_bower.json': 'bower.json'
        , 'gulpfile.js': 'gulpfile.js'
        , 'webpack.config.js': 'webpack.config.js'
        , 'index.html': 'app/index.html'
        , 'client.jsx': 'src/client.jsx'
        , 'Application.jsx': 'src/components/Application.jsx'
        , 'Application-test.js': '__tests__/Application-test.js'
        , 'preprocessor.js': 'preprocessor.js'
      });
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  },

  _copyEach: function (map) {
    _.each(map, function (dest, templatePath) {
      this.fs.copy(
        this.templatePath(templatePath),
        this.destinationPath(dest)
      );
    }, this);
  }
});
