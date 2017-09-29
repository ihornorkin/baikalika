import runSequence from 'run-sequence';
import gulp from 'gulp';

gulp.task('styles:dependencies', () => (
	runSequence(
		'sprites',
		'scss-style'
	)
));

gulp.task('default', () => (
	runSequence(
		[
			'styles:dependencies',
			'templates'
		],
		'server',
		'copy:image',
		'copy:libs',
		'copy:fonts',
		'watch'
	)
));

gulp.task('build', () => (
	runSequence(
		'styles:dependencies',
		'scripts',
		'copy',
		'copy:image',
		'copy:fonts',
		'copy:libs',
		'templates',
		'watch'
	)
));
