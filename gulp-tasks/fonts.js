const gulp = require('gulp');

const PATHS = require('../paths');

module.exports = function fonts() {
  return gulp.src(PATHS.src.fonts).pipe(gulp.dest(PATHS.build.fonts));
};
