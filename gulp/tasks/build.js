var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function() {

	var args = [
		['browserify', 'sass', 'vendor', 'images', 'xmlMin'],
		'unrevAssets',
		'rev'
	];

	if (!global.isWatching) {
		args.splice(2, 0, 'revAssets');
	}

	runSequence.apply(this, args);

});
