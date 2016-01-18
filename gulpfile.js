'use strict';
const path = require('path');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('static', function () {
  return gulp.src(['**/*.js', '!generators/*/templates/**'])
    .pipe($.excludeGitignore())
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  $.nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('generators/*/*.js')
    .pipe($.excludeGitignore())
    .pipe($.istanbul({
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  let mochaErr;

  gulp.src('test/**/*.js')
    .pipe($.plumber())
    .pipe($.mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe($.istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['generators/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe($.coveralls());
});

gulp.task('copy-templates', ['copy-templates:web']);
gulp.task('copy-templates:web', function () {
  const src = [
    'generators/web/_templates/**/*.{js,css,html,json}',
    'generators/web/_templates/**/.gitignore',
    '!generators/web/_templates/bin'
  ];
  return gulp.src(src)
    .pipe($.rename(path => {
      path.basename = path.basename.replace(/^\./, '_');
    }))
    .pipe(gulp.dest('generators/web/templates'));
});

gulp.task('prepublish', ['copy-templates', 'nsp']);
gulp.task('default', ['copy-templates', 'static', 'test', 'coveralls']);
