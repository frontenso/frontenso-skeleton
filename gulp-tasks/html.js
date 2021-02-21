const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-api');
const notifier = require('node-notifier');
const plumber = require('gulp-plumber');
const beautify = require('gulp-jsbeautifier');
const minifyInline = require('gulp-minify-inline-scripts');
const gulpif = require('gulp-if');
const log = require('fancy-log');
const colors = require('ansi-colors');
const htmlValidator = require('gulp-w3c-html-validator');
const through2 = require('through2');

const PRODUCTION = require('../config').PRODUCTION;
const PATHS = require('../paths');
const extensions = require('../src/assets/templates/lib/extensions.js');
const filters = require('../src/assets/templates/lib/filters.js');
const functions = require('../src/assets/templates/lib/functions.js');

module.exports = function html() {
  delete require.cache[require.resolve('../global-data.json')];
  const globalData = require('../global-data.json');

  return gulp
    .src(PATHS.src.nunj)
    .pipe(
      plumber({
        errorHandler: function (err) {
          log.error(colors.red(err.message));
          notifier.notify({
            title: 'Nunjucks Compilation Error',
            message: err.message,
          });
        },
      })
    )
    .pipe(
      nunjucksRender({
        src: PATHS.src.templates,
        data: Object.assign(
          {
            DEVELOP: !PRODUCTION,
          },
          globalData
        ),
        extensions,
        filters,
        functions,
        trimBlocks: true,
        lstripBlocks: true,
        autoescape: false,
      })
    )
    .pipe(htmlValidator({ skipWarnings: true }))
    .pipe(
      through2.obj((file, encoding, callback) => {
        callback(null, file);
        if (!file.w3cjs.success) {
          const filename = file.history[0].split('/').slice(-1);
          const errorTitle = 'HTML validation error(s) found';
          if (PRODUCTION) {
            throw new Error(errorTitle);
          }
          notifier.notify({
            title: errorTitle,
            message: file.w3cjs.messages
              .map((v) => `${filename}: ${v.message}`)
              .join('\n'),
          });
        }
      })
    )
    .pipe(
      gulpif(
        PRODUCTION,
        beautify({
          max_preserve_newlines: 1,
          wrap_line_length: 0,
          indent_size: 2,
        })
      )
    )
    .pipe(gulpif(PRODUCTION, minifyInline()))
    .pipe(gulp.dest(PATHS.build.html));
};
