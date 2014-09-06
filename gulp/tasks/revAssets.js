var gulp    = require('gulp');
var rename  = require('gulp-rename');
var rimraf  = require('gulp-rimraf');
var filter  = require('gulp-filter');
var rev     = require('gulp-rev');
var changed = require('gulp-changed');
var pkg     = require('../../package.json');

var exts    = ['css', 'js'];
var re      = new RegExp('(-[a-z0-9]{8})(\.('+exts.join('|')+'))$', 'i');

var src     = pkg.folders.dest+'/**/*.{'+exts.join(',')+'}';
var dest    = pkg.folders.dest;

function removeHash(path) {

	if (exts.indexOf(path.extname.substr(1)) > -1) {
		path.basename = path.basename.replace(/(-[a-z0-9]{8})$/i, '');
	}

};

gulp.task('_cleanFilenames', function () {

	return gulp.src(src)
		.pipe(changed(src))
		.pipe(rename(removeHash))
		.pipe(gulp.dest(dest));

});

gulp.task('_cleanOldAssets', ['_cleanFilenames'], function () {

	var hashedFilter = filter(function (file) { return re.test(file.path); });

	return gulp.src(src)
		.pipe(changed(src))
		.pipe(hashedFilter)
    	.pipe(rimraf());

});

gulp.task('_versionCleanAssets', ['_cleanOldAssets'], function () {

	return gulp.src(src)
		.pipe(changed(src))
		.pipe(rev())
		.pipe(gulp.dest(dest))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./'));

});

gulp.task('revAssets', ['_versionCleanAssets'], function () {

	var unHashedFilter = filter(function (file) { return !re.test(file.path); });

	return gulp.src(src)
		.pipe(changed(src))
		.pipe(unHashedFilter)
    	.pipe(rimraf());

});