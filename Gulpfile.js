//Global gulp variables
var gulp = require('gulp');
var fs = require('fs');
config = require('./gulpConfig');
var path = require('path');


//require gulpfiles in order...

require('./Gulp/testTasks');
require('./Gulp/scriptTasks');
require('./Gulp/assetTasks');
require('./Gulp/generalTasks');
require('./Gulp/watchTasks');

/*function walk(curDirPath) {
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


walk(path.join(__dirname, config.gulp_dir));*/



