/**
 * The 'copy' task accomplishes a couple of sub-tasks. It's primary job is to copy
 * files from point A to point B (in fact, that is all it's doing for
 * any project asset file... images, fonts, etc.). It's secondary job is
 * to wrap all project javascript files in an immediately invoked function
 * expression (refer to John Papa's Angular Style Guide for more details on
 * IIFE's and their relevance) before copying files over.
 *
 * Specifically, the first two tasks below copy project assets and javascript files into
 * the 'build' directory (used in the 'build' task), while the final copies asset files
 * into the 'compile' directory (used in the 'compile' task)
 */

var wrap = require('gulp-wrapper');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');

//TARGETS
var appJS = config.app_files.js;

gulp.task('copy', ['build:copy_assets', 'build:copy_js']);

/*gulp.task('build:copy_js', function() {
    return gulp.src(appJS)
        .pipe(filter('**!/!*.js'))
        .pipe(wrap({
            header: "(function ( window, angular, undefined ) {\n 'use strict';\n",
            footer: "})( window, window.angular );\n"
        }))
        .pipe(gulp.dest(config.build));
});*/


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
