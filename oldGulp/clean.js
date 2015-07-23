var clean = require('gulp-clean');


gulp.task('clean', function() {
    return gulp.src([config.build, config.compile, config.temp])
        .pipe(clean({read:false}));
});


/* GRUNT CODE TO COPY
var cleangrunt = [
    'build',
    'compile',
    'temp'
];*/


