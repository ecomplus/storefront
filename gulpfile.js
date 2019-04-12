'use strict'

const path = require('path')
const { src, dest, parallel, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const cleanCss = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const buildSass = require('gulp-sass')

const filename = 'storefront-twbs'

const html = () => {
  browserSync.init({
    server: './docs',
    port: 3376
  })
  watch('./scss/**/*.scss', sass)
  watch('./docs/index.html', browserSync.reload)
}

const sass = () => {
  return src('./scss/' + filename + '.scss')
    .pipe(sourcemaps.init())
    .pipe(buildSass({
      includePaths: [
        path.join(process.cwd(), 'node_modules'),
        process.cwd()
      ]
    }).on('error', buildSass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('./docs'))
    .pipe(browserSync.stream())
}

const dist = () => {
  return src('./docs/' + filename + '.css')
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
