const { src, dest, watch, series } = require('gulp');
const sass     = require('gulp-sass')(require('sass'));
const bs       = require('browser-sync').create();

function compileSass() {
  return src('scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('css'))
    .pipe(bs.stream());
}

function serve() {
  bs.init({ server: './' });
  watch('scss/**/*.scss', compileSass);
  watch('**/*.html').on('change', bs.reload);
}

exports.default = series(compileSass, serve);