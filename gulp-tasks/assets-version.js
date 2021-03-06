const gulp = require('gulp');
const nanoid = require('nanoid').nanoid;
const replace = require('gulp-replace');
const fs = require('fs');
const md5File = require('md5-file');

const PATHS = require('../paths');
const PRODUCTION = require('../config').PRODUCTION;

const buildPath = PATHS.build.html.replace(/\/$/, '');

module.exports = function assetsVersion() {
  let checkedFiles = [];

  return gulp
    .src(buildPath + '/**/*.html')
    .pipe(
      replace(/([\w\/]+\.[js|css]+\?)hash/gi, function (match) {
        let assetPath = __dirname;

        assetPath = assetPath.replace('gulp-tasks', buildPath);

        const assetPathHasSlash =
          assetPath.charAt(assetPath.length - 1) === '/';
        const matchHasSlash = match.charAt(0) === '/';

        if (assetPathHasSlash && matchHasSlash) {
          assetPath = assetPath + match.substring(1);
        } else if (!assetPathHasSlash && !matchHasSlash) {
          assetPath = assetPath + '/' + match;
        } else {
          assetPath += match;
        }
        assetPath = assetPath.substring(0, assetPath.indexOf('?'));

        let hash = '';
        let isRealHash;
        if (fs.existsSync(assetPath)) {
          hash = md5File.sync(assetPath);
          isRealHash = true;
        } else {
          hash = nanoid();
          isRealHash = false;
        }

        if (checkedFiles.indexOf(assetPath) < 0) {
          checkedFiles.push(assetPath);
          console.log(
            `${assetPath} ${isRealHash ? 'real' : 'fake'} hash added: ${hash}`
          );
        }

        let res = match.replace('hash', '');
        res = PRODUCTION ? res + hash : res.replace('?', '');
        return res;
      })
    )
    .pipe(gulp.dest(buildPath));
};
