const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sprites = require('postcss-sprites');
const assets = require('postcss-assets');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-clean-css');
const gulpif = require('gulp-if');
const log = require('fancy-log');
const colors = require('ansi-colors');

const PATHS = require('../paths');
const PRODUCTION = require('../config').PRODUCTION;

const PROCESSORS = [
  autoprefixer({
    cascade: true,
  }),
  assets({
    loadPaths: [PATHS.src.imagesInline],
    cache: true,
  }),
  sprites({
    stylesheetPath: './build/assets/css/',
    spritePath: './build/assets/images/',
    retina: true,
    padding: 4,
    filterBy: (image) =>
      /sprites\/.*\.png$/gi.test(image.url)
        ? Promise.resolve()
        : Promise.reject(),
  }),
];

module.exports = function styles() {
  return gulp
    .src(PATHS.src.styles)
    .pipe(
      plumber({
        errorHandler: function (err) {
          log.error(colors.red(err.message));
          notifier.notify({
            title: 'SASS compilation error',
            message: err.message,
          });
        },
      })
    )
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(
      sass({
        outputStyle: 'compact',
        errLogToConsole: true,
        indentedSyntax: true,
        includePaths: ['./node_modules/'],
      })
    )
    .pipe(postcss(PROCESSORS))
    .pipe(gulpif(PRODUCTION, cssmin({ processImport: false })))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(PATHS.build.styles));
};
