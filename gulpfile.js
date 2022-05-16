// Defining requirements
//const browserSync = require('browser-sync').create();
const clone = require('gulp-clone');
const concat = require('gulp-concat');
const del = require('del');
const ftp = require('vinyl-ftp');
const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const ignore = require('gulp-ignore');
const plumber = require('gulp-plumber');
const rimraf = require('gulp-rimraf');
const watch = require('gulp-watch');
const argv = require('yargs').argv;
const replace = require('gulp-replace');

//SASS, CSS and JS operation
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const cssnano = require('gulp-cssnano');
const eslint = require('gulp-eslint');
const merge = require('gulp-merge');
const merge2 = require('merge2');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const uglifyES = require('gulp-uglify-es').default;


//Images operation
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');

//Bower requirements
const inject = require('gulp-inject');
const wiredep = require('wiredep');


// Configuration file to keep your code DRY
var cfg = require('./gulpconfig.json');
var paths = cfg.paths;


// Run:
// gulp sass-sass
// Compiles SCSS files in CSS to prod
gulp.task('sass-prod', function () {
	var source = gulp.src(paths.sass + '/*.scss')
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer());

	var pipe1 = source.pipe(clone())
		.pipe(gulp.dest(paths.css))
		.pipe(rename('custom-editor-style.css'))
		.pipe(autoprefixer());


	var pipe2 = source.pipe(clone())
		.pipe(cssnano({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.css));

	return merge(pipe1, pipe2);
});

// Run:
// gulp sass
// Compiles SCSS files in CSS
gulp.task('sass', function () {
	var stream = gulp.src(paths.sass + '/*.scss')
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init()) // add this
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./')) // add this
		.pipe(gulp.dest(paths.css))
		.pipe(rename('custom-editor-style.css'))
	return stream;
});

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task on changes
gulp.task('watch', function () {

	if (cfg.watchTask.styles) {
		gulp.watch(paths.sass + '/**/*.scss', ['styles'])
	}
	if (cfg.watchTask.scripts) {
		gulp.watch([paths.scripts + '/**/*.js', '!/js/theme.js', '!/js/theme.min.js'], ['scripts']);
	}

	if (cfg.watchTask.imagemin) {
		gulp.watch('img/src/**', ['imagemin'])
	}
	if (cfg.watchTask.svgmin) {
		gulp.watch('svg/src/**', ['svgmin'])
	}

});

// Run:
// gulp cssnano
// Minifies CSS files
gulp.task('cssnano', function () {
	return gulp.src(paths.css + '/theme.css')
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(cssnano({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.css))
});

gulp.task('minify-css', function () {
	return gulp.src(paths.css + '/theme.css')
		.pipe(sourcemaps.init({
			loadMaps: true
		}))
		.pipe(cleanCSS({
			compatibility: '*'
		}))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./')) // add this
		.pipe(gulp.dest(paths.css));
});

gulp.task('cleancss', function () {
	return gulp.src(paths.css + '/*.min.css', {
			read: false
		}) // much faster
		.pipe(ignore('*.css'))
		.pipe(rimraf());
});

gulp.task('styles', function (callback) {
	gulpSequence('sass', 'minify-css')(callback)
});

// Run:
// gulp browser-sync
// Starts browser-sync task for starting the server.
gulp.task('browser-sync', function () {
	browserSync.init(cfg.browserSyncWatchFiles, cfg.browserSyncOptions);
});


// Run:
// gulp watch-bs
// Starts watcher with browser-sync. Browser-sync reloads page automatically on your browser
gulp.task('watch-bs', ['browser-sync', 'watch', 'scripts'], function () {});


// Run:
// gulp imagemin
// Running image optimizing task
gulp.task('imagemin', function () {
	gulp.src(path.img + '/src/**')
		.pipe(imagemin([
        imagemin.gifsicle({
				interlaced: true
			}),
        imagemin.jpegtran({
				progressive: true
			}),
        imagemin.optipng({
				optimizationLevel: 5
			}),
        imagemin.svgo({
				plugins: [{
					removeViewBox: true
				}]
			})
    ]))
		.pipe(gulp.dest(path.img))
});

// Run:
// gulp imagemin
// Running image optimizing task
gulp.task('svgmin', function () {
	gulp.src(paths.svg + '/src/**')
		.pipe(svgmin())
		.pipe(gulp.dest(paths.svg));
});


// Run:
// gulp scripts.
// Uglifies and concat all JS files into one

gulp.task('scripts', ['lint'], function () {
	const scripts = [
        // Start - All BS4 stuff
		//cfg.loadBoostrapJS ? paths.dev + '/js/bootstrap4/bootstrap.bundle.js' : ! paths.dev + '/js/bootstrap4/bootstrap.bundle.js',

        // End - All BS4 stuff
		//cfg.loadBoostrapJS ? paths.dev + '/js/skip-link-focus-fix.js' : !paths.dev + '/js/skip-link-focus-fix.js',

		// All vendor js files
		paths.dev + '/js/vendor/**/*.js',

        // Theme scripts
        !paths.scripts + '/theme/**/*.js',

		// All single scripts
		!paths.scripts + '/single/**/*.js'
    ];

	const themeScripts = [
		paths.scripts + '/theme/**/*.js',
	]

	const singleScripts = [
		paths.scripts + '/single/**/*.js'
	]

	gulp.src(scripts)
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(concat('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js));

	gulp.src(scripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(paths.js));

	gulp.src(themeScripts)
		.pipe(babel(cfg.babelOptions))
		.pipe(concat('theme.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.js));

	gulp.src(singleScripts)
		.pipe(gulp.dest(paths.js + '/single/'))
		.pipe(babel(cfg.babelOptions))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.js + '/single/'));

	return gulp.src(themeScripts, { allowEmpty: true })
		.pipe(babel(cfg.babelOptions))
		.pipe(concat('theme.js'))
		.pipe(gulp.dest(paths.js));
});

gulp.task('lint', function () {
	if (cfg.lint_js) {
		//do lint only on scripts located on theme folder
		gulp.src([paths.scripts + '/theme/**/*.js'])
			.pipe(eslint(cfg.lint_opt))
			.pipe(eslint.format())
			.pipe(eslint.failAfterError());
	}
});


gulp.task('bower', function () {
	const target = gulp.src(['./header.php', './footer.php']);

	const jsWire = wiredep(cfg.wiredepOptions).js;
	const cssWire = wiredep(cfg.wiredepOptions).css;

	if (typeof jsWire !== 'undefined') {

		target.pipe(inject(
				gulp.src(jsWire)
				.pipe(concat('bower.min.js'))
				.pipe(uglifyES())
				.pipe(gulp.dest(paths.bowerJS))
			))
			.pipe(gulp.dest('./'));

	}

	if (typeof cssWire !== 'undefined') {

		target.pipe(inject(
				gulp.src(cssWire).pipe(concat('bower.min.css'))
				.pipe(cssnano({
					discardComments: {
						removeAll: true
					}
				}))
				.pipe(gulp.dest(paths.bowerCSS))
			))
			.pipe(gulp.dest('./'));
	}


	//TODO - automatically add enqueue to wordpress

	/*
	    <!-- inject:css -->
	    <!-- endinject -->

	    <!-- inject:js -->
	    <!-- endinject -->
	*/
});

// Run:
// gulp copy-assets.
// Copy all needed dependency assets files from bower_component assets to themes /js, /scss and /fonts folder. Run this task after bower install or bower update

////////////////// All Bootstrap SASS  Assets /////////////////////////
gulp.task('copy-assets', function () {

	////////////////// All Bootstrap 4 Assets /////////////////////////
	// Copy all JS files
	var stream = gulp.src(paths.node + 'bootstrap/dist/js/**/*.js')
		.pipe(gulp.dest(paths.dev + '/js/bootstrap4'));

	// Copy all Bootstrap SCSS files
	gulp.src(paths.node + 'bootstrap/scss/**/*.scss')
		.pipe(gulp.dest(paths.dev + '/sass/bootstrap4'));

	////////////////// End Bootstrap 4 Assets /////////////////////////

	// Copy all Font Awesome Fonts
	gulp.src(paths.node + 'font-awesome/fonts/**/*.{ttf,woff,woff2,eot,svg}')
		.pipe(gulp.dest('./fonts'));

	// Copy all Font Awesome SCSS files
	gulp.src(paths.node + 'font-awesome/scss/*.scss')
		.pipe(gulp.dest(paths.dev + '/sass/fontawesome'));

	// _s SCSS files
	gulp.src(paths.node + 'undescores-for-npm/sass/media/*.scss')
		.pipe(gulp.dest(paths.dev + '/sass/underscores'));

	// _s JS files into /src/js
	gulp.src(paths.node + 'undescores-for-npm/js/skip-link-focus-fix.js')
		.pipe(gulp.dest(paths.dev + '/js'));
});

// Deleting the files distributed by the copy-assets task
gulp.task('clean-vendor-assets', function () {
	return del([paths.dev + '/js/bootstrap4/**', paths.dev + '/sass/bootstrap4/**', './fonts/*wesome*.{ttf,woff,woff2,eof,svg}', paths.dev + '/sass/fontawesome/**', paths.dev + '/sass/underscores/**', paths.dev + '/js/skip-link-focus-fix.js', paths.js + '/**/skip-link-focus-fix.js', paths.js + '/**/popper.min.js', paths.js + '/**/popper.js', (paths.vendor !== '' ? (paths.js + paths.vendor + '/**') : '')]);
});

// Run
// gulp dist-prod
// Copies the files to the /dist folder for distributon as simple theme
gulp.task('dist-prod', ['clean-dist-prod', 'scripts', 'sass-prod'], function () {
	return gulp.src(['**/*', '!' + paths.bower, '!' + paths.bower + '/**', '!' + paths.node, '!' + paths.node + '/**', '!' + paths.dev, '!' + paths.dev + '/**', '!' + paths.distDev, '!' + paths.distDev + '/**', '!' + paths.distProd, '!' + paths.distProd + '/**', '!' + paths.sass, '!' + paths.sass + '/**', '!readme.txt', '!readme.md', '!package.json', '!gulpfile.js', "!gulpconfig.json", "!example.htaccess", '!CHANGELOG.md', '!.travis.yml', '!jshintignore', '!codesniffer.ruleset.xml', '*'], {
			'buffer': true
		})
		// .pipe(replace('/js/jquery.slim.min.js', '/js' + paths.vendor + '/jquery.slim.min.js'))
		// .pipe(replace('/js/popper.min.js', '/js' + paths.vendor + '/popper.min.js'))
		// .pipe(replace('/js/skip-link-focus-fix.js', '/js' + paths.vendor + '/skip-link-focus-fix.js'))
		.pipe(gulp.dest(paths.distProd));
});

// Deleting any file inside the /src folder
gulp.task('clean-dist-prod', function () {
	return del([paths.distProd + '/**/*', ]);
});

// Run
// gulp dist-dev
// Copies the files to the /dist-dev folder for distributon as theme with all assets and deploy
gulp.task('dist-dev', ['clean-dist-dev', 'scripts', 'styles'], function () {
	gulp.src(['**/*', '!' + paths.bower, '!' + paths.bower + '/**', '!' + paths.node, '!' + paths.node + '/**', '!' + paths.distProd, '!' + paths.distProd + '/**', '!' + paths.distDev, '!' + paths.distDev + '/**', '*'])
		.pipe(gulp.dest(paths.distDev))
});

// Deleting any file inside the /src folder
gulp.task('clean-dist-dev', function () {
	return del([paths.distDev + 'dist-dev/**/*']);
});

gulp.task('deploy', function () {

	let env = (function () {
		if (argv.dev) {
			return 'dev'
		}
		if (argv.prod) {
			return 'prod'
		}
		return null;
	})();

	let deployPaths = {};

	let conn;

	switch (env) {
	case 'dev':
		conn = ftp.create(cfg.ftp.dev);

		deployPaths.theme = argv.media ? paths.deployMediaDev : paths.deployThemeDev;
		deployPaths.globs = argv.media ? '../../uploads/**' : paths.distDev + '/**';
		deployPaths.base = argv.media ? '../../uploads/' : paths.distDev + '/';

		if (deployPaths.theme == '' || deployPaths.globs == '' || deployPaths.base == '') {
			console.error('ONE OF THE DEV DEPLOY PATHS IS NOT DEFINED.');
			return false;
		}

		break;
	case 'prod':
		conn = ftp.create(cfg.ftp.prod);

		deployPaths.theme = argv.media ? paths.deployMediaProd : paths.deployThemeProd;
		deployPaths.globs = argv.media ? '../../uploads/**' : paths.distProd + '/**';
		deployPaths.base = argv.media ? '../../uploads/' : paths.distProd + '/';

		if (deployPaths.theme == '') {
			console.error('ONE OF THE PROD DEPLOY PATHS IS NOT DEFINED.');
			return false;
		}

		break;
	default:
		console.error('ERROR ON DEPLOYMENT. No environment was provided, try --dev or --prod');
		return false;
	}

	return gulp.src(deployPaths.globs, {
			base: deployPaths.base,
			buffer: false
		})
		.pipe(conn.newerOrDifferentSize(deployPaths.theme))
		.pipe(conn.dest(deployPaths.theme));

});
