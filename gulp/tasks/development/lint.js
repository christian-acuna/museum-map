var gulp        = require('gulp');
var config      = require('../../config').scripts;
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', function() {
  return lint(config.source, {
    fix: true
  })
    .pipe(gulp.dest(config.appDest));
});
