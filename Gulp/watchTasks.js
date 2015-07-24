gulp = require('gulp');
nodemon = require('gulp-nodemon');
jshint = require('gulp-jshint');
mainBowerFiles = require('main-bower-files');

var server = 'server.js';
var vendorJS = mainBowerFiles({filter:'**/*.js'});
var vendorCSS = mainBowerFiles({filter:'**/*.css'});

var gulp = require('gulp');
browserSync = require('browser-sync').create();

browserSync.emitter.on('init', function() {
    console.log("Browsersync is running...");
});

gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: config.compile,
            index: 'index.html',
            routes: ''
        },
        port: 8000,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        logLevel: 'debug',
        logPrefix: 'OrderCloud 3.0'
    })
});

gulp.task('watch', ['dev'], function() {
    //appjs
    gulp.watch(config.app_files.js, ['build:copy_js'], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...');
        browserSync.reload();
    });
    //bowerjs
    gulp.watch(vendorJS, ['build:js_bower'], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...');
        browserSync.reload();
    });
//bowercss
    gulp.watch(vendorCSS, ['build:vendor_css'], function() {
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
    gulp.watch(config.app_files.assets, ['build:css'], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
//styles
    gulp.watch(config.supportedStyles, ['build:css'], function() {
        console.log('File ' + event.path + ' was ' + event.type + ', restarting server...')
    });
});
