const gulp = require('gulp');

const PATHS = require('../paths');

module.exports = function publicAssets() {
  return gulp.src(PATHS.src.public).pipe(gulp.dest(PATHS.build.public));
};
