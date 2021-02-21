const gulp = require('gulp');

const PATHS = require('../paths');

module.exports = function video() {
  return gulp.src(PATHS.src.videos).pipe(gulp.dest(PATHS.build.videos));
};
