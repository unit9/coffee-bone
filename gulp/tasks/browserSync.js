var browserSync = require('browser-sync');
var gulp        = require('gulp');
var pkg         = require('../../package.json')

gulp.task('browserSync', ['build'], function() {
  browserSync.init([pkg.folders.dest+'/**'], {
    server: {
      baseDir: [pkg.folders.src, pkg.folders.dest]
    }
  });
});
