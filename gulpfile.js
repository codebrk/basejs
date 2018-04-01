'use strict';

const gulp = require('gulp'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minify = require('gulp-uglify'),
    maps = require('gulp-sourcemaps');

gulp.task("concatJs", function() {
    return gulp.src([
        "js/core.js",
        "js/ui.js",
        "js/http.js"
    ])
        .pipe(maps.init())
        .pipe(concat("base.js"))
        .pipe(maps.write("./"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("minifyJs", function() {
    return gulp.src([
        "./dist/js/base.js"
    ])
        .pipe(minify())
        .pipe(rename("base.min.js"))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("default", ["concatJs"], function () {
    gulp.start("minifyJs");
});

gulp.task("watch", function() {
    gulp.watch(["./js/*.js", "./js/**/*.js"], ["concatJs"]);
});