/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var uglify       = require('gulp-uglify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var pkg          = require('../../package.json')

gulp.task('browserify', function() {

  var bundleMethod = global.isWatching ? watchify : browserify;

  var bundler = bundleMethod({
    // Specify the entry point of your app
    entries: ['./'+pkg.folders.src+'/coffee/Main.coffee'],
    // Add file extentions to make optional in your requires
    extensions: ['.coffee'],
    // Enable source maps!
    debug: true
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source('main.js'))
      // Specify the output destination
      .pipe(gulp.dest('./'+pkg.folders.dest+'/js/'))
      // Log when bundling completes!
      .on('end', function() {

        if(global.isWatching) {
          bundleLogger.end()
        } else {
          gulp.src(pkg.folders.dest+'/js/main.js')
            .pipe(uglify())
            .pipe(gulp.dest(pkg.folders.dest+'/js'))
            .on('end', bundleLogger.end);
        }

      });
  };

  if(global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});
