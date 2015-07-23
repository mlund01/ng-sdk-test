//GENERAL
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');

var source_list = mainBowerFiles();
var lessFilter = filter('**/*.less');
var sassFilter = filter('**/*.sass', '**/*.scss');
var cssFilter = filter('**/*.css');

//BUILD
gulp.task('build:css', function() {
    return gulp.src(config.supportedStyles)
        .pipe(lessFilter)
        .pipe(less())
        .pipe(lessFilter.restore())
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(sassFilter.restore())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(gulp.dest(config.build + 'assets/'))

});

gulp.task('compile:css', function() {
    return gulp.src(config.build + '**/*.css')
        .pipe(concat())
        .pipe(minify())
        .pipe(gulp.dest(config.compile + 'assets/'))

});

gulp.task('build:css_bower', function() {
    return gulp.src(source_list)
        .pipe(cssFilter)
        .pipe(concat(currVersion + '.css'))
        .pipe(gulp.dest(config.build + 'assets'))
});