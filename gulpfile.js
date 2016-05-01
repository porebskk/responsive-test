var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    merge = require('merge-stream');

// lints all JS files in src/js
gulp.task('lint', function () {
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// concat js script files to app.js and do the same with as minified
gulp.task('scripts', function () {
    //prepare beauty code
    var appJs = gulp.src(['./bower_components/angular/angular.js', './src/js/*.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./js'));

    //prepare ugly code
    var minifiedAppJs = merge(
        gulp.src('./bower_components/angular/angular.min.js'),
        gulp.src('./src/js/*.js')
            .pipe(uglify())
    )
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('./js'));

    //run both in parallel
    return merge(appJs, minifiedAppJs);
});

// sassify
gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(rename('bundesland.css'))
        .pipe(gulp.dest('.'));
});

// global watcher task to do all the magical stuff
gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['lint', 'scripts']);
});

// gulp default task (runs all individual tasks, then kicks off the watcher task)
gulp.task('default', ['lint', 'sass', 'scripts']);
