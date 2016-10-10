var gulp        = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('extras', function() {
  return gulp.src(['app/json/*.json'], {
    dot: true
  }).pipe(gulp.dest('dist/json'));
});
