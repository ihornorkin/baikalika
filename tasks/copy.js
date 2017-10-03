import gulp from 'gulp';
import changed from 'gulp-changed';
import filter from 'gulp-filter';
import gulpIf from 'gulp-if';

const {INCLUDE_ROBOTS} = process.env;

gulp.task('copy', () => (
	gulp.src('app/resources/**/*')
		.pipe(changed('dist'))
		.pipe(gulpIf(!INCLUDE_ROBOTS, filter(file => !/resources[\\\/]robots\.txt/.test(file.path))))
		.pipe(gulp.dest('dist'))
));

gulp.task('copy:image', () => (
	gulp.src('app/images/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/images/'))
));

gulp.task('copy:libs', () => (
	gulp.src('app/libs/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/libs/'))
));

gulp.task('copy:fonts', () => (
	gulp.src('app/fonts/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/fonts/'))
));

gulp.task('copy:scss', () => (
	gulp.src('app/styles/**/*')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/scss/'))
));

gulp.task('copy:blocks', () => (
	gulp.src('app/blocks/**/*.scss')
		.pipe(changed('dist'))
		.pipe(gulp.dest('dist/blocks/'))
));
