var browserSync = require('browser-sync');
var gulp        = require('gulp');
var fs          = require('fs');
var pkg         = require('../../package.json')

gulp.task('browserSync', ['build'], function() {
  browserSync.init([pkg.folders.dest+'/**'], {

    server: {
      baseDir: [pkg.folders.src, pkg.folders.dest],
      middleware: function (req, res, next) {

        // static route for pushstate
        var exists = fs.existsSync(process.cwd() + "/" + pkg.folders.dest + req.url);
        if(req.url == "/" || !exists) req.url = "/index.html";

        next();
      }
    }
  });
});
