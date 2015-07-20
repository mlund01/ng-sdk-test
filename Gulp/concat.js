var header = require('gulp-header');
var concat = require('gulp-concat');
//var config = require('gulp-oc-config');

var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;

gulp.task('concat:build_css', function() {
    gulp.src(config.vendor_files.css, config.build + '/assets/' + currVersion + '.css')
        .pipe(gulp.dest(config.build + 'assets/' + currVersion + '.css'))
});

gulp.task('concat:compile_js', function() {
    gulp.src(config.build + '**/*.js')
        .pipe(concat(currVersion + '.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.compile))
});






/* GRUNT CONFIG TO COPY
concat: {
    /!**
     * The `build_css` target concatenates compiled CSS and vendor CSS
     * together.
     *!/
    build_css: {
        src: [
            '<%= vendor_files.css %>',
            '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
        ],
            dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
    },
    /!**
     * The `compile_js` target is the concatenation of our application source
     * code and all specified vendor source code into a single file.
     *!/
    compile_js: {
        options: {
            banner: '<%= meta.banner %>'
        },
        src: [
            '<%= vendor_files.js %>',
            'module.prefix',
            '<%= build_dir %>/src/!**!/!*.js',
            '<%= html2js.app.dest %>',
            'module.suffix'
        ],
            dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
    }
}*/
