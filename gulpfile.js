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
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');

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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('optimizeImages', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('cleanDist', function () {
    gulp.src('dist', {read: false})
        .pipe(clean())
});

gulp.task('dev', ['sass', 'uglify', 'optimizeImages'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    gulp.watch('src/img/**/*', ['optimizeImg']);
    gulp.watch('src/js/*.js', ['uglify']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('build', function() {
    runSequence('cleanDist', 'sass', 'uglify', 'optimizeImages');
});