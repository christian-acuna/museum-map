var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config      = require('../../config').browsersync.development;

/**
 * Run the build task and start a server with BrowserSync
 */
// gulp.task('browsersync', ['build'], function() {
//   browsersync(config);
// });

// gulp.task('serve', function() {
//   browsersync(config);
// });

gulp.task('serve', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles:app']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  // gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep']);
});
