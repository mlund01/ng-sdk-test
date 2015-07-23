var header = require('gulp-header');
var concat = require('gulp-concat');
//var config = require('gulp-oc-config');

var pkg = require('../package.json');
var banner = config.banner;
var currVersion = pkg.name + "-" + pkg.version;
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var jsFilter = filter('**/*.js');

gulp.task('build:js_bower', function() {
    return gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(concat(currVersion + '.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest(config.build))
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
