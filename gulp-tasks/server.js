const browserSync = require('browser-sync').create();

const PATHS = require('../paths');

const watchFiles = [
  PATHS.build.styles + '*.css',
  PATHS.build.html + '/*.html',
  PATHS.build.scripts + '*.js',
];

module.exports = function server() {
  browserSync.init({
    server: {
      baseDir: './build',
    },
    injectchanges: true,
    notify: false,
    open: false,
    port: 9000,
    logPrefix: 'skeleton',
    files: watchFiles,
  });
};
