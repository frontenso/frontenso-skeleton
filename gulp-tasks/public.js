import gulp from 'gulp';

import PATHS from '../paths';

export default function publicAssets() {
  return gulp.src(PATHS.src.public).pipe(gulp.dest(PATHS.build.public));
}
