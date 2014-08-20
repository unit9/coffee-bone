var gulp         = require('gulp');
var sass         = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var pkg          = require('../../package.json')

// gulp.task('sass', ['images'], function () {
gulp.task('sass', function () {
  return gulp.src(pkg.folders.src+'/sass/main.scss')
    .pipe(sass())
    .on('error', handleErrors)
    .pipe(gulp.dest(pkg.folders.dest+'/css'));
});
