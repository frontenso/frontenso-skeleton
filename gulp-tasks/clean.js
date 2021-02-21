const del = require('del');

const PATHS = require('../paths');

module.exports = function clean() {
  return del(PATHS.clean);
};
