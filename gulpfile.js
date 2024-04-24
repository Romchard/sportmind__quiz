const {src, dest, watch, parallel, series} = require('gulp')

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat')
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const clean = require('gulp-clean')
const include = require('gulp-include')

// const avif = require('gulp-avif')
// const webp = require('gulp-webp')
// const imagemin = require('gulp-imagemin')
// const newer = require('gulp-newer')
// const svgSprite = require('gulp-svg-sprite')
// const fonter = require('gulp-fonter')
// const ttf2woff2 = require('gulp-ttf2woff2')

// function fonts() {
// 	return src('app/assets/fonts/src/*.*')
// 		.pipe(
// 			fonter({
// 				formats: ['woff', 'ttf'],
// 			})
// 		)
// 		.pipe(src('app/assets/fonts/*.ttf'))
// 		.pipe(ttf2woff2())
// 		.pipe(dest('app/assets/fonts'))
// }

// function images() {
// 	return src(['app/assets/img/src/*.*', '!app/assets/img/src/*.svg'])
// 		.pipe(newer('app/assets/img'))
// 		.pipe(avif({ quality: 50 }))
// 		.pipe(dest('app/assets/img'))
//
// 		.pipe(src('app/assets/img/src/*.*'))
// 		.pipe(newer('app/assets/img'))
// 		.pipe(webp())
// 		.pipe(dest('app/assets/img'))
//
// 		.pipe(src('app/assets/img/src/*.*'))
// 		.pipe(newer('app/assets/img'))
// 		.pipe(imagemin())
// 		.pipe(dest('app/assets/img'))
// }

// function sprite() {
// 	return src('app/img/*.svg')
// 		.pipe(
// 			svgSprite({
// 				mode: {
// 					stack: {
// 						sprite: '../sprite.svg',
// 						example: true,
// 					},
// 				},
// 			})
// 		)
// 		.pipe(dest('app/images'))
// }

function pages() {
    return src('app/assets/pages/*.html')
        .pipe(
            include({
                includePaths: 'app/assets/components',
            })
        )
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src(['app/js/project-files/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('app/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({overrideBrowserslist: ['> 1%', 'last 2 versions']}))
        .pipe(concat('main.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

function watching() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    });

    watch(['app/scss/**/*.scss'], styles)
    // watch(['app/assets/img/src'], images)
    watch(['app/js/project-files/main.js'], scripts)
    watch(['app/assets/components/*', 'app/assets/pages/*'], pages).on('change', browserSync.reload);
    watch(['app/*.html']).on('change', browserSync.reload);
}


function cleanDist() {
    return src('dist').pipe(clean())
}

function dev() {
    return src(
        [
            'app/css/main.min.css',
            'app/css/main.css',
            'app/assets/img/*.*',
            'app/assets/img/icons/*.*',
            'app/assets/fonts/*.*',
            'app/js/main.min.js',
            'app/js/project-files/*.js',
            'app/**/*.html',
            '!app/img/*.svg',
            '!app/img/sprite.svg',
            '!app/assets/img/**/*.html',
            '!app/assets/components/*.html',
            '!app/assets/pages/*.html',
        ],
        {base: 'app'}
    ).pipe(dest('dist'))
}

// exports.images = images
// exports.fonts = fonts
// exports.sprite = sprite

exports.styles = styles
exports.pages = pages
exports.dev = dev
exports.scripts = scripts
exports.watching = watching

exports.build = series(cleanDist, dev)
exports.default = parallel(styles /* , images , fonts, */, scripts, pages, watching)
