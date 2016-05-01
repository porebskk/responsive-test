var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    order = require('gulp-order'),
    sass = require('gulp-sass'),
    embedTemplates = require('gulp-angular-embed-templates'),
    merge = require('merge-stream');

// lints all JS files in src/js
gulp.task('lint', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// concat js script files to app.js and do the same with as minified
gulp.task('scripts', function () {
    //prepare beauty code
    var appJs = gulp.src([
            './src/js/**/*.js'
        ])
        .pipe(embedTemplates())
        .pipe(gulp.src([
            './bower_components/angular/angular.js',
            './bower_components/angular-resource/angular-resource.js'
        ]))
        .pipe(order([
            'bower_components/angular/angular.js',
            'bower_components/**/*.js',
            'src/js/**/*.js'
        ]))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./js'));

    //TODO minify

    //run both in parallel
    return appJs;
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
