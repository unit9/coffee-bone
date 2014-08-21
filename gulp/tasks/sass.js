var gulp         = require('gulp');
var sass         = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var prefix       = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var pkg          = require('../../package.json')

gulp.task('sass', ['images'], function () {
  return gulp.src(pkg.folders.src+'/sass/main.scss')
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(prefix("ie >= 8", "ff >= 3", "safari >= 4", "opera >= 12", "chrome >= 4"))
    .pipe(gulp.dest(pkg.folders.dest+'/css'));
});
