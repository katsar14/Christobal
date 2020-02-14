const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const del = require("del");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const imagemin = require("gulp-imagemin");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const minify = require('gulp-csso');
const server = require("browser-sync").create();
const sassGlob = require('gulp-sass-glob');

gulp.task('scripts', (done) => {
    gulp.src('./src/js/index.js')
        .pipe(plumber())
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(gulp.dest('./build/js'));
    done();
});

// gulp.task('vendor', () => {
//     gulp.src('./src/js/vendor.js')
//         .pipe(plumber())
//         .pipe(webpackStream(webpackConfig), webpack)
//         .pipe(gulp.dest('./build/js'));
// });

gulp.task("styles", function () {
    return gulp.src("src/sass/style.scss")
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: 'expanded' })
            .on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(minify())
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("copy", function () {
    return gulp.src([
        "src/audio/**/*",
        "src/fonts/**/*.{woff,woff2}"
    ], {
        base: "src"
    })
        .pipe(gulp.dest("build"));
});

// gulp.task("copy", function () {
//     return gulp.src([
//         "src/fonts/**/*.{woff,woff2}"
//     ], {
//         base: "src"
//     })
//         .pipe(gulp.dest("build"));
// });

gulp.task("images", function () {
    return gulp.src("src/img/**/*.{png,jpg,jpeg,webp,svg}")
        .pipe(imagemin([
            imagemin.optipng({ optimizationLevel: 3 }),
            imagemin.mozjpeg({ progressive: true }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("build/img/"));
});

gulp.task("sprite", function () {
    return gulp.src("build/img/icon-*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img/"));
});

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('build'))
});

gulp.task("server", function () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("styles"));
    gulp.watch("src/img/**/*.{png,jpg,svg}", gulp.series("images", "sprite", "refresh"));
    gulp.watch("src/**/*.html", gulp.series("html", "refresh"));
    gulp.watch("src/js/**/*.js", gulp.series("scripts", "refresh"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "styles",
    "scripts",
    // "vendor",
    "images",
    "sprite",
    "html"
));

gulp.task("start", gulp.series("build", "server"));
