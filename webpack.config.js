'use strict';
const path = require('path');

const PRODUCTION = require('./config').PRODUCTION;
const paths = require('./paths');

const entryPoints = {
  bundle: path.resolve(__dirname, paths.src.scripts),
};

module.exports = {
  entry: Object.keys(entryPoints).reduce((acc, currentKey) => {
    acc[currentKey] = [entryPoints[currentKey]];
    return acc;
  }, {}),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, paths.build.scripts),
    publicPath: '/assets/js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        // enforce: 'pre',
        use: ['ts-loader'],
        // include: [
        //   path.resolve(__dirname, 'src/assets/js'),
        //   path.resolve(__dirname, 'src/assets/components'),
        //   // path.resolve(__dirname, 'node_modules/gsap'),
        //   // path.resolve(__dirname, 'node_modules/swiper'),
        // ],
      },
    ],
  },
  devtool: PRODUCTION ? undefined : 'eval',
  mode: PRODUCTION ? 'production' : 'development',
  optimization: {
    minimize: PRODUCTION,
  },
  watch: !PRODUCTION,
};
