var
  gulp = require('gulp'),
  babel = require('gulp-babel'),
  del = require('del'),
  vinyl = require('vinyl-paths'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  svgmin = require('gulp-svgmin');


const paths = {
    baseDir: './',

    sourceHTML: ['*.hbs', './partials/*.hbs'],
    sourceJS: ['./assets/js/*.js', './bower_components/allineed-sidebar/sidebar.js'],
    sourceSCSS: ['./assets/ihana.scss'],
    sourceFONTS: ['./bower_components/allineed/src/fonts/**/*'],
    sourceIMAGES: ['./bower_components/allineed/src/images/**'],
    watchSCSS: ['./assets/**/*.scss'],

    dest: './',
    destJS: './assets/js/',
    destCSS: './assets/css/',
    destFONTS: './assets/fonts/',
    destIMAGES: './assets/images/',
  },

  PRESETS = ['es2015'],
  BASENAME = 'ihana',
  SOURCES = [paths.sourceHTML],
  OUTPUT_STYLE = 'expanded',
  CLEAN_READ = false,
  BABEL_STEAM = true;

gulp.task('watch', function () {
  gulp.watch(paths.sourceJS, ['babel'])
  gulp.watch(paths.watchSCSS, ['sass'])
})

gulp.task('babel', function () {
  return gulp.src(paths.sourceJS)
    .pipe(babel({ presets: PRESETS }))
    .pipe(uglify())
    .pipe(rename({ basename: BASENAME }))
    .pipe(gulp.dest(paths.destJS))
})

gulp.task('sass', function () {
  gulp.src(paths.sourceSCSS)
    .pipe(sass({ outputStyle: OUTPUT_STYLE }))
    .pipe(gulp.dest(paths.destCSS))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.destCSS))
})

gulp.task('fonts', function () {
  return gulp.src(paths.sourceFONTS)
    .pipe(gulp.dest(paths.destFONTS));
})

gulp.task('images', function () {
  return gulp.src(paths.sourceIMAGES)
    .pipe(gulp.dest(paths.destIMAGES));
})

gulp.task('compile', ['babel', 'sass', 'fonts', 'images'])
gulp.task('default', ['compile', 'watch'])
