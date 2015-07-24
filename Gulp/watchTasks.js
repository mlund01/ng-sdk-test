gulp = require('gulp');
nodemon = require('gulp-nodemon');
jshint = require('gulp-jshint');
mainBowerFiles = require('main-bower-files');

var server = 'server.js';
var vendorJS = mainBowerFiles({filter:'**/*.js'});
var vendorCSS = mainBowerFiles({filter:'**/*.css'});


gulp.task('watch', function() {
    //appjs
    gulp.watch(config.app_files.js, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
    //bowerjs
    gulp.watch(vendorJS, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//bowercss
    gulp.watch(vendorCSS, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//templates
    gulp.watch(config.app_files.atpl, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//index
    gulp.watch(config.source + config.index, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//assets
    gulp.watch(config.app_files.assets, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//styles
    gulp.watch(config.supportedStyles, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//server
    gulp.watch(server, [], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
});
