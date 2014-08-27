var gulp         = require('gulp');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var cmq          = require('gulp-combine-media-queries');
var gutil        = require('gulp-util');
var handleErrors = require('../util/handleErrors');
var pkg          = require('../../package.json')

gulp.task('sass', ['images'], function () {

	return gulp.src(pkg.folders.src+'/sass/main.scss')
		.pipe(sass())
		.on('error', handleErrors)
		.pipe(prefix("ie >= 8", "ff >= 3", "safari >= 4", "opera >= 12", "chrome >= 4"))
		.pipe(gulp.dest(pkg.folders.dest+'/css'))
		.on('end', function() {

			if(!global.isWatching) {

				gutil.log('Now minifying CSS...');

				return gulp.src(pkg.folders.dest+'/css/main.css')
					.pipe(cmq())
					.pipe(minifyCSS())
					.pipe(gulp.dest(pkg.folders.dest+'/css'));

			}

		});
});
