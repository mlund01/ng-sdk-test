//Global gulp variables
gulp = require('gulp');
config = require('./gulpConfig');
var fs = require('fs');
var path = require('path');

function walk(curDirPath) {
    fs.readdirSync(curDirPath).forEach(
        function (name) {
        var filePath = path.join(curDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            require(filePath);
        } else {
            walk(filePath)
        }
    });
}
walk(path.join(__dirname, config.gulp_dir));

gulp.task('default', ['clean']);

gulp.task('copy', ['build:copy_assets', 'build:copy_js']);
