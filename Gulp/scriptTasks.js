var header = require('gulp-header');
var concat = require('gulp-concat');
var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var wrap = require('gulp-wrapper');
var html2js = require('gulp-html2js');

var jsFilter = filter('**/*.js');
var appJS = config.app_files.js;

gulp.task('build:js_bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat(currVersion + '.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.build))
});

gulp.task('build:copy_js', function() {
    return gulp.src(appJS)
        .pipe(jsFilter)
        .pipe(wrap({
            header: "(function ( window, angular, undefined ) {\n 'use strict';\n",
            footer: "})( window, window.angular );\n"
        }))
        .pipe(gulp.dest(config.build));
});

gulp.task('build:templateCache', function() {
    return gulp.src(config.app_files.atpl)
        .pipe(html2js({
            base: 'src/app',
            outputModuleName: 'template-app',
            useStrict: true }))
        .pipe(concat('template-app.js'))
        .pipe(gulp.dest(config.build))
});

gulp.task('compile:js', function() {
    gulp.src(config.build + "**/*.js")
        .pipe(concat())
        .pipe(uglify())
        .pipe(gulp.dest(config.compile))
});