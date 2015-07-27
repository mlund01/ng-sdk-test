//GENERAL
var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var filter = require('gulp-filter');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');

var pkg = require('../package.json');
var currVersion = pkg.name + "-" + pkg.version;
/*var lessFilter = filter('**!/!*.less');
var sassFilter = filter(['**!/!*.sass', '**!/!*.scss']);
var cssFilter = filter('**!/!*.css');*/


/*BUILD*/
gulp.task('b_m:css', function() {
    var lessFilter = filter('**/*.less');
    var sassFilter = filter(['**/*.sass', '**/*.scss']);

    return gulp
        .src(mainBowerFiles({filter: ['**/*.css', '**/*.less', '**/*.scss', '**/*.sass']})
            .concat([config.source + '**/*.css', config.source + '**/*.less', config.source + '**/*.scss', config.source + '**/*.sass']))
        .pipe(plumber())
        .pipe(lessFilter)
        .pipe(less())
        .pipe(lessFilter.restore())
        .pipe(sassFilter)
        .pipe(sass())
        .pipe(sassFilter.restore())
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(concat(currVersion + '.css'))
        .pipe(gulp.dest(config.build + 'assets'))
        .pipe(browserSync.stream())

});

gulp.task('b_c:css', function() {
    return gulp.src(config.build + 'assets/**/*.css', {read:false})
        .pipe(clean());
});

gulp.task('b_m:assets', function() {
    return gulp.src([
        config.source + 'assets/**/*',
        '!' + config.source + '**/*.css',
        '!' + config.source + '**/*.less',
        '!' + config.source + '**/*.scss',
        '!' + config.source + '**/*.sass'])
        .pipe(gulp.dest(config.build + 'assets'))
});

gulp.task('b_c:assets', function() {
    return gulp.src([
        config.build + 'assets/**/*',
        '!' + config.build + '**/*.css',
        '!' + config.build + '**/*.less',
        '!' + config.build + '**/*.scss',
        '!' + config.build + '**/*.sass'], {read:false})
        .pipe(clean())
});

/*COMPILE*/
gulp.task('c_m:css', function() {
    return gulp.src(config.build + 'assets/**/*.css')
        .pipe(minify())
        .pipe(gulp.dest(config.compile + 'assets/'));
});

gulp.task('c_c:css', function() {
    return gulp
        .src(config.compile + '**/*.css', {read:false})
        .pipe(clean());
});

gulp.task('c_m:assets', function() {
    return gulp.src([
        config.build + 'assets/**/*',
        '!' + config.build + '**/*.css',
        '!' + config.build + '**/*.less',
        '!' + config.build + '**/*.scss',
        '!' + config.build + '**/*.sass'])
        .pipe(gulp.dest(config.compile + 'assets'))
});

gulp.task('c_c:assets', function() {
    return gulp
        .src([config.compile + 'assets/**/*', '!' + config.compile + 'assets/**/*.css'], {read:false})
        .pipe(clean());
});

//Master Asset Tasks
gulp.task('build:css', gulp.series('b_c:css', 'b_m:css'));
gulp.task('compile:css', gulp.series('c_c:css', 'build:css', 'c_m:css'));
gulp.task('build:assets', gulp.series('b_c:assets', 'b_m:assets'));
gulp.task('compile:assets', gulp.series('c_c:assets', 'build:assets', 'c_m:assets'));