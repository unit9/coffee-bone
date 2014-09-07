var gulp    = require('gulp');
var gutil   = require('gulp-util');
var replace = require('gulp-replace');
var pkg     = require('../../package.json');

gulp.task('rev', function () {

	// supplant index from src with manifest, pipe to dest
	var manifest = {};

	if (!global.isWatching) {
		try {
			manifest = require('../../rev-manifest.json');
		} catch (e) {
			gutil.log('\'' + gutil.colors.cyan('rev') + '\' - no manifest, using defaults');
		}
	}

	return gulp.src(pkg.folders.src+'/html/*.html')
		.pipe(replace(/\{{ ([^{}]*) \}}/g, function(a, b) {
			var r = manifest[b];
			return r && (typeof r === 'string' || typeof r === 'number') ? r : b;
		}))
		.pipe(gulp.dest(pkg.folders.dest));

});