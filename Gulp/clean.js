/**
 * The directories to delete when `grunt clean` is executed.
 *
 * ML... These need to be defined in the gulp config file
 */
var cleangrunt = [
    'build',
    'compile',
    'temp'
];

var config = require('gulp-oc-config')();
var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    var stream = gulp.src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
    return stream;
});