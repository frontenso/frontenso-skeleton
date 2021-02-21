const gulp = require('gulp');

const clean = require('./gulp-tasks/clean');
const html = require('./gulp-tasks/html');
const styles = require('./gulp-tasks/styles');
const fonts = require('./gulp-tasks/fonts');
const assetsVersion = require('./gulp-tasks/assets-version');
const images = require('./gulp-tasks/images');
const svg = require('./gulp-tasks/svg');
const zip = require('./gulp-tasks/zip');
const watch = require('./gulp-tasks/watch');
const server = require('./gulp-tasks/server');
const video = require('./gulp-tasks/video');
const publicAssets = require('./gulp-tasks/public');

gulp.task(
  'build',
  gulp.parallel(html, styles, fonts, images, svg, video, publicAssets)
);

gulp.task('production', gulp.series(clean, 'build', assetsVersion));

gulp.task('zip', gulp.series('production', zip));

gulp.task('default', gulp.parallel('build', watch, server));
