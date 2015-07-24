//Global gulp variables
var gulp = require('gulp');
var fs = require('fs');
config = require('./gulpConfig');
var path = require('path');




function walk(curDirPath) {
    fs.readdirSync(curDirPath).forEach(
        function (name) {
        var filePath = path.join(curDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile()) {
            require(filePath);
        } else {
            walk(filePath);
        }
    });
}


walk(path.join(__dirname, config.gulp_dir));


