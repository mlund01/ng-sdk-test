var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var dirPath = "./Gulp";


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
walk(path.join(__dirname, "Gulp"));

gulp.task('default', ['copy']);