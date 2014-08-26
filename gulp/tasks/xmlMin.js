var gulp       = require('gulp');
var prettyData = require('gulp-pretty-data');
var pkg        = require('../../package.json');

gulp.task('xmlMin', function() {
  gulp.src(pkg.folders.src+'/data/templates.xml')
    .pipe(prettyData({type: 'minify', preserveComments: false}))
    .pipe(gulp.dest(pkg.folders.dest+'/data'))
});