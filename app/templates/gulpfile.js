var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: ['app']
    }
  });
});

gulp.task('browserSyncReload', function () {
  browserSync.reload();
});

gulp.task('browserify', function () {
  return browserify({ extensions: ['.jsx'] })
    .transform('reactify', { harmony: true })
    .add('./src/client.jsx')
    .bundle()
    .on('error', function (e) {
      console.log(e);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('app/scripts/'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.{js,jsx}'], ['browserify']);
  gulp.watch(['app/*.html', 'app/scripts/*.js'], ['browserSyncReload']);
});

gulp.task('default', ['browserify', 'browserSync', 'watch']);
