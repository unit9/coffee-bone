var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil  = require('gulp-util');
var pkg    = require('../../package.json');

gulp.task('vendor', function() {

	var source = []
	for (key in pkg.vendor)
		source.push(pkg.folders.vendor +"/"+ pkg.vendor[key]);

	return gulp.src(source)
		.pipe(concat('v.js'))
		.pipe(gulp.dest(pkg.folders.dest+'/js/vendor/'))
		.on('end', function() {

			if(!global.isWatching) {

				gutil.log('Now minifying vendor JS...');

				return gulp.src(pkg.folders.dest+'/js/vendor/v.js')
					.pipe(uglify())
					.pipe(gulp.dest(pkg.folders.dest+'/js/vendor/'));

			}

		});
		
});