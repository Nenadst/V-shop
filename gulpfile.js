const { series, src, dest, watch, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const webpack = require('webpack-stream');

function styles() {
    return src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss({ compatibility: 'ie11' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

async function scripts() {
    return src(['src/js/app.js'])
        .pipe(webpack(require('./webpack.config')))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename( 'app.min.js' ))
        .pipe(dest('dist/js'));
}

function copyFavicon() {
    return src('./favicon.ico')
        .pipe(dest('dist'));
}

function copyJson() {
    return src('src/data.json')
        .pipe(dest('dist'));
}

function copyImages() {
    return src('src/images/**/*.{png,jpg,jpeg,svg}')
        .pipe(dest('dist/images'));
}

function optimizeImages() {
    return src('src/images/**/*.{png,jpg,jpeg,svg}')
        .pipe(imageMin())
        .pipe(dest('dist/images'));
}

function copyHtml() {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}

function cleanDist() {
    return src('dist/', {
        read: false,
        allowEmpty: true
    }).pipe(clean());
}

function copyFonts() {
    return src('src/fonts/**/*.{ttf,otf,eot,woff,woff2}', {
        base: 'src'
    }).pipe(dest('dist/'));
}

function watchForChanges() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    watch('src/**/*.html').on('change', series(copyHtml, browserSync.reload));
    watch('src/scss/**/*.scss', styles);
    watch('src/js/**/*.js').on('change', series(scripts, browserSync.reload));
    watch('src/images/**/*.{png,jpg,jpeg,svg}', series(copyImages, browserSync.reload));
}

exports.init = copyHtml;
exports.cleanDist = cleanDist;

exports.watch = series(cleanDist, parallel(scripts, styles, copyImages, copyHtml, copyJson, copyFonts), watchForChanges);
exports.default = series(cleanDist, parallel(scripts, styles, optimizeImages, copyHtml, copyJson, copyFonts));