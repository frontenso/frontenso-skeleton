const gulpWatch = require('gulp-watch');

const PATHS = require('../paths');
const html = require('./html');
const styles = require('./styles');
const fonts = require('./fonts');
const images = require('./images');
const svg = require('./svg');
const video = require('./video');
const publicAssets = require('./public');

module.exports = function watch() {
  gulpWatch(PATHS.watch.nunj, html);
  gulpWatch([PATHS.watch.styles], styles);
  gulpWatch([PATHS.watch.fonts], fonts);
  gulpWatch([PATHS.watch.images], images);
  gulpWatch([PATHS.watch.svg], svg);
  gulpWatch([PATHS.watch.videos], video);
  gulpWatch([PATHS.watch.public], publicAssets);
};
