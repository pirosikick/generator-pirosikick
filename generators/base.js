'use strict';
const path = require('path');
const Base = require('yeoman-generator').Base;
const defaultUserName = 'pirosikick';

module.exports = Base.extend({
  _setPrompt(done) {
    const prompts = [
      {
        type: 'input',
        name: 'userName',
        message: 'Who are you?',
        default: defaultUserName
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
      this.githubURL = this._buildGithubURL(props.projectName, props.userName);
      done();
    });
  },

  _packageJSON(template) {
    return Object.assign(template, {
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
  },

  _buildGithubURL(projectName, userName) {
    userName = userName || defaultUuserName;
    return `https://github.com/${userName}/${projectName}`;
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
