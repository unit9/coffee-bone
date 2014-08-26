var gulp      = require('gulp');
var minifyCSS = require('gulp-minify-css');
var cmq       = require('gulp-combine-media-queries');
var pkg       = require('../../package.json');

gulp.task('sassMin', ['sass'], function () {
  return gulp.src(pkg.folders.dest+'/css/main.css')
  	.pipe(cmq())
    .pipe(minifyCSS())
    .pipe(gulp.dest(pkg.folders.dest+'/css'));
});
