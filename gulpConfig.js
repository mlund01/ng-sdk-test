var source = './src/';
var build = './build2/';
var compile = './compile2/';
var root = './';
var index = 'index.html';
var temp = './.tmp/';
var gulp_dir = './Gulp';

module.exports = {
    gulp_dir: gulp_dir,
    banner: ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.licenses.url %>',
        ' */',
        ''].join('\n'),
    allCSS: [
        source + '**/*.css',
        source + '**/*.less',
        source + '**/*.sass'
    ],
    allHTML: [
        source + '**/*.html'
    ],
    allJS: [
        source + '**/*.js',
        './*.js',
        './gulp/**/*.js'
    ],
    build: build,
    compile: compile,
    fonts: [
        source + 'assets/fonts/**.*'
    ],
    htmlTemplates: [
        source + '**/*.html',
        '!' + source + index
    ],
    index: index,
    module: {
        prefix: '(function () {\n"use strict";\n\n',
        suffix: '\n\n}());'
    },
    npm_pkg: './package.json',
    bower_pkg: './bower.json',
    src: source,
    supportedStyles: [
        source + '**/*.css',
        source + '**/*.less',
        source + '**/*.sass',
        source + '**/*.scss'
    ],
    temp: temp,
    root: root,
    app_files: {
        js: [ source + '**/*.js', '!' + source + '**/*.spec.js', '!' + source + 'assets/**/*.js' ],
        assets: [source + 'assets/**'],
        jsunit: [ source + '**/*.spec.js' ],

        atpl: [ source + 'app/**/*.tpl.html' ],

        html: [ source + 'index.html' ],
        import_less: [
            'vendor/normalize-css/normalize.css', //ambient dependency
            'vendor/ambient/less/ambient.less',
            'vendor/font-awesome/less/font-awesome.less',
            source + 'app/**/*.less'
        ]
    },
    vendor_files: {
        js: [
            'vendor/angular/angular.js',
            'vendor/angular-sanitize/angular-sanitize.js',
            'vendor/angular-messages/angular-messages.js',
            'vendor/angular-animate/angular-animate.js',
            'vendor/angular-touch/angular-touch.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/jquery/dist/jquery.js',
            'vendor/ordercloud-angular-sdk/dist/ordercloud-angular-sdk.js'
        ],
        css: [],
        assets: []
    }

};