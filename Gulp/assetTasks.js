//GENERAL
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');

var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;
var source_list = mainBowerFiles();
var lessFilter = filter('**/*.less');
var sassFilter = filter('**/*.sass', '**/*.scss');
var cssFilter = filter('**/*.css');

cssTargets = [];
cssTargets = source_list;
cssTargets.push(config.build + '/**/*.css');
config.supportedStyles.forEach(function(each) {
    cssTargets.push(each);
});

/*BUILD*/
gulp.task('build:css', ['clean:build_css'], function() {
    return gulp.src(cssTargets)
        .pipe(lessFilter)
        .pipe(less())
        .pipe(lessFilter.restore())
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(sassFilter.restore())
        .pipe(cssFilter)
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(concat(currVersion + '.css'))
        .pipe(gulp.dest(config.build + '/assets'))
        .pipe(browserSync.stream());
});

gulp.task('clean:build_css', function() {
    return gulp.src(config.build + '/assets/**/*.css', {read:false})
        .pipe(clean({force: true}));
});


/*COMPILE*/
gulp.task('compile:css', function() {
    gulp.src(config.compile + '/!**!/!*.css', {read:false})
        .pipe(clean({force: true}));

    return gulp.src(config.build + 'assets/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest(config.compile + 'assets/'));
});