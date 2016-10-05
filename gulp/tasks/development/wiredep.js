var gulp        = require('gulp');
var wiredep = require('wiredep').stream;
// var config      = require('../../config').scripts;
// var $ = require('gulp-load-plugins')();

gulp.task('wiredep', function() {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});
