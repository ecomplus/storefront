'use strict'

const { src, dest, parallel, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const cleanCss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const buildSass = require('gulp-sass')

const filename = 'storefront-twbs'

const html = () => {
  browserSync.init({
    server: './sample',
    port: 3376
  })
  watch('./scss/**/*.scss', sass)
  watch('./sample/index.html', browserSync.reload)
}

const sass = () => {
  return src('./scss/' + filename + '.scss')
    .pipe(sourcemaps.init())
    .pipe(buildSass().on('error', buildSass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./sample'))
    .pipe(browserSync.stream())
}

const dist = () => {
  return src('./sample/' + filename + '.css')
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(rename('' + filename + '.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('./dist'))
}

exports.sass = sass
exports.dist = dist
exports.html = html
exports.default = parallel(html, sass)
