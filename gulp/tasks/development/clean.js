var del = require('del');
var gulp = require('gulp');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
