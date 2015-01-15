'use strict';
var yeoman = require('yeoman-generator');

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

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      { packageName: this.packageName, description: this.description }
    );

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js')
    );

    this.fs.copy(
      this.templatePath('test/index.js'),
      this.destinationPath('test/index.js')
    );
  },

  install: function () {
    this.installDependencies({ bower: false });
  }
});
