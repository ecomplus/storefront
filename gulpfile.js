'use strict'

const { src, dest, parallel, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const tailwindcss = require('tailwindcss')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const concatCss = require('gulp-concat-css')

const html = () => {
  browserSync.init({
    server: './sample',
    port: 3375
  })
  watch('./src/*.css', css)
  watch('./sample/*.html', () => browserSync.reload)
}

const css = () => {
  return src('./src/*.css')
    .pipe(postcss([
      tailwindcss('./tailwind.js'),
      autoprefixer
    ]))
    .pipe(concatCss('utils.css'))
    .pipe(dest('./sample'))
    .pipe(browserSync.stream())
}

exports.css = css
exports.html = html
exports.default = parallel(html, css)
