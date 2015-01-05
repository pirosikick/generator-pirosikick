var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var webpack = require('webpack');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: ['.tmp', 'app']
    }
  });
});

gulp.task('browserSyncReload', function () {
  browserSync.reload();
});

gulp.task('webpack', function (done) {
  var config = require('./webpack.config');

  webpack(config, function (err, stats) {
    if (err) {
      throw new $.util.PluginError("webpack", err);
    }

    $.util.log('[webpack]', stats.toString({ chunks: false }));
    done();
  });
});

gulp.task('watch', ['webpack', 'browserSync'], function () {
  gulp.watch(['src/**/*.{js,jsx}'], ['webpack']);
  gulp.watch(['app/*.html', '.tmp/**/*.js'], ['browserSyncReload']);
});

gulp.task('default', ['watch']);
