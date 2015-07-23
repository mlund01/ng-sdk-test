var gulp = require('gulp');
var config = require('gulp-oc-config');
var html2js = require('gulp-html2js');
var concat = require('gulp-concat');

gulp.task('build:templateCache', function() {
    return gulp.src(config.app_files.atpl)
        .pipe(html2js({
            base: 'src/app',
            outputModuleName: 'template-app',
            useStrict: true }))
        .pipe(concat('template-app.js'))
        .pipe(gulp.dest(config.build))
});







/* GRUNT TO COPY

html2js: {
    /!**
     * These are the templates from `src/app`.
     *!/
    app: {
        options: {
            base: 'src/app'
        },
        src: [ '<%= app_files.atpl %>' ],
        dest: '<%= build_dir %>/templates-app.js'
    }
},*/
