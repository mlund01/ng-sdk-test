/**
 * The `copy` task just copies files from A to B. We use it here to copy
 * our project assets (images, fonts, etc.) and javascripts into
 * `build_dir`, and then to copy the assets to `compile_dir`.
 */

var config = require('gulp-oc-config')();
var gulp = require('gulp');

//TARGETS
var appAssets = config.app_files.assets;
var vendorAssets = config.vendor_files.assets;
var appJS = config.app_files.js;
var vendorJS = config.vendor_files.js;

gulp.task('copy:build_assets', function() {
    var stream = gulp.src([appAssets, vendorAssets])
        .pipe(gulp.dest(config.build + 'assets/'));
    return stream;
});

gulp.task('copy:build_js', function() {
    var stream = gulp.src([appJS, vendorJS])
        .pipe(gulp.dest(config.build));
    return stream;
});

gulp.task('copy:compile_assets', function() {
    var stream = gulp.src([config.build + 'assets/'])
        .pipe(gulp.des(config.compile + 'assets/'));
    return stream;
});


/*COPIED GRUNT TASK

var copygrunt = {
    build_app_assets: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= build_dir %>/assets/',
                cwd: 'src/assets',
                expand: true
            }
        ]
    },
    build_vendor_assets: {
        files: [
            {
                src: [ '<%= vendor_files.assets %>' ],
                dest: '<%= build_dir %>/assets/',
                cwd: '.',
                expand: true,
                flatten: true
            }
        ]
    },
    build_appjs: {
        files: [
            {
                src: [ '<%= app_files.js %>' ],
                dest: '<%= build_dir %>/',
                cwd: '.',
                expand: true
            }
        ]
    },
    build_vendorjs: {
        files: [
            {
                src: [ '<%= vendor_files.js %>' ],
                dest: '<%= build_dir %>/',
                cwd: '.',
                expand: true
            }
        ]
    },
    compile_assets: {
        files: [
            {
                src: [ '**' ],
                dest: '<%= compile_dir %>/assets',
                cwd: '<%= build_dir %>/assets',
                expand: true
            }
        ]
    }
}*/
