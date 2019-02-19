'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const clean = require('gulp-clean');
const cleanDest = require('gulp-clean-dest');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('styles.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(rename("styles.min.css"))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
});

gulp.task("uglify", function () {
    return gulp.src("src/js/*.js")
        .pipe(concat('script.js'))
        .pipe(rename("script.min.js"))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write()) // Inline source maps.
        // For external source map file:
        //.pipe(sourcemaps.write("./maps")) // In this case: lib/maps/bundle.min.js.map
        .pipe(gulp.dest("dist/js"));
});

gulp.task('cleanDist', function () {
    gulp.src('dist', {read: false})
        .pipe(clean())
})

gulp.task('dev', ['sass', 'uglify'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch('src/js/*.js', ['uglify']).on('change', browserSync.reload);
    gulp.watch('src/scss/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('build', ['cleanDist', 'sass', 'uglify']);




// 'use strict';
//
// let gulp = require('gulp'); // podkluchaem modul gulp
// let uglify = require('gulp-uglify'); //gulp-uglify-es
// let browserSync = require('browser-sync').create();
// let sass = require('gulp-sass');
// let concat = require('gulp-concat');
// let rename = require('gulp-rename');
// let imagemin = require('gulp-imagemin');
// let pngquant = require('imagemin-pngquant');
// let sourcemaps = require('gulp-sourcemaps');
// let autoprefixer = require('gulp-autoprefixer');
//
//
// gulp.task('pushImgs', function () {
//     gulp.src('src/images/**/*')  // berem vse imgs
//         .pipe(imagemin({
//             interlaced: true,
//             progressive: true,
//             optimizationLevel: 5,
//             svgoPlugins: [
//                 {
//                     removeViewBox: true
//                 }
//             ],
//             use: [pngquant()]
//         }))
//         .pipe(gulp.dest('dist/images'))
// })
//
//
// gulp.task('clean', function () {
//     gulp.src('dist', {read: false})
//         .pipe(clean())
// })
//
// gulp.task('serve', ['sass', 'uglify'], function () {
//     browserSync.init({
//         server: './'
//     })
//
//     gulp.watch('src/js/*.js', ['uglify']);
//     gulp.watch('src/scss/*.scss', ['sass']);
//     gulp.watch('index.html').on('change', browserSync.reload);
// });
//
// gulp.task('sass', function () {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sourcemaps.init())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(sass())
//         .pipe(gulp.dest('dist/css'))
// });
//
// gulp.task('hello', function () {
//     console.log('Hello');
// });
//
// gulp.task('second', function () {
//     console.log('second');
// });
//
// // gulp.task('dist', gulp.parallel(['hello', 'second'], () => {
// //     console.log('==========FIN=========')
// //     return
// // }))
//
// gulp.task('uglify', function () {
//     gulp.src('src/js/*.js') // vozmi vse js
//     // .pipe(concat('bundle.js'))
//     // .pipe(gulp.dest('dist'))
//         .pipe(uglify()) // primeni uglyfi
//         // .pipe(rename('bundle.min.js'))
//         .pipe(gulp.dest('dist')) //zapiwi vse v dist
// })
//
// // gulp.task('default', ['uglify']);