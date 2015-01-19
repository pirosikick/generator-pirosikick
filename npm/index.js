'use strict';
var yeoman = require('yeoman-generator');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  prompting: function () {
      var done = this.async();

      var prompts = [
        {
            type: 'input'
          , name: 'packageName'
          , message: 'Package name you\'ll make'
          , default: this.appname.replace(/\s/g, '-', 'g')
        },
        {
            type: 'input'
          , name: 'description'
          , message: 'Description'
          , default: 'This package is so cool.'
        }
      ];

      var callback = function (answers) {
        this.packageName = answers.packageName;
        this.description = answers.description;

        done();
      }.bind(this);

      this.prompt(prompts, callback);
  },

  configuring: {
    save: function () {
      this.config.set({
        packageName: this.packageName,
        description: this.description
      });
    },
    gitignore: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  writing: function () {
    var data = { packageName: this.packageName, description: this.description };

    var files = [
        ['_package.json', 'package.json', data]
      , ['index.js', 'index.js']
      , ['src/index.js', 'src/index.js']
      , ['test/index.js', 'test/index.js']
    ];

    _.each(files, function (files) {
      var src = this.templatePath(files[0])
        , dest = this.destinationPath(files[1]);

      files[2]
        ? this.fs.copyTpl(src, dest, files[2])
        : this.fs.copy(src, dest);
    }, this);
  },

  install: function () {
    this.installDependencies({
        skipInstall: this.options['skip-install']
      , bower: false
    });
  }
});
