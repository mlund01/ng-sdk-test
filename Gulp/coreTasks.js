var gulp = require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('dev', function() {
    browserSync.init({
        server: {
            baseDir: config.build,
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
