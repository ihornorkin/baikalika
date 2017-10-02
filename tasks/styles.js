import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpIf from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import nano from 'gulp-cssnano';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import errorHandler from 'gulp-plumber-error-handler';
import sass from 'gulp-sass';
import magicImporter from 'node-sass-magic-importer';

const isDebug = process.env.NODE_ENV !== 'production';

gulp.task('scss-style', () => (
		gulp.src('app/styles/app.scss')
		.pipe(plumber({errorHandler: errorHandler(`Error in \'styles\' task`)}))
		.pipe(gulpIf(isDebug, sourcemaps.init()))
		.pipe(sass({
			importer: magicImporter()
		}))
		.pipe(autoprefixer({browsers: ['last 3 versions']}))
		.pipe(gulpIf(!isDebug, gcmq()))
		.pipe(gulpIf(!isDebug, nano({zindex: false})))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(isDebug, sourcemaps.write()))
		.pipe(gulp.dest('dist/styles'))
	));
