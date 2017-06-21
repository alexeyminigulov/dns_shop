var elixir = require('laravel-elixir');

var gulp           = require('gulp'),
    gutil          = require('gulp-util' ),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    ftp            = require('vinyl-ftp'),
    notify         = require("gulp-notify");

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

// elixir(function(mix) {
//     mix.sass('app.scss');
// });



// Скрипты проекта

gulp.task('common-js', function() {
    return gulp.src([
        'resources/assets/js/common.js',
    ])
        .pipe(concat('common.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('resources/assets/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
        'resources/assets/libs/jquery/dist/jquery.min.js',
        'resources/assets/libs/magnifier/demo/Event.js',
        'resources/assets/libs/magnifier/Magnifier.js',
        'resources/assets/libs/owl.carousel/dist/owl.carousel.min.js',
        'resources/assets/libs/fancybox/dist/jquery.fancybox.min.js',
        'resources/assets/libs/bootstrap/js/tab.js',
        'resources/assets/libs/typeahead.js/dist/typeahead.jquery.min.js',
        'resources/assets/libs/typeahead.js/dist/bloodhound.min.js',
        'resources/assets/libs/handlebars/handlebars.min.js',
        'resources/assets/libs/knockout/dist/knockout.js',
        'resources/assets/libs/moment/min/moment.min.js',
        'resources/assets/libs/pikaday/pikaday.js',

        'resources/assets/libs/jquery-ui/ui/minified/widget.js',
        'resources/assets/libs/jquery-ui/ui/widgets/mouse.js',
        'resources/assets/libs/jquery-ui/ui/widgets/slider.js',

        'resources/assets/libs/jquery-ui/ui/unique-id.js',
        'resources/assets/libs/jquery-ui/ui/widgets/accordion.js',

        'resources/assets/libs/jquery-ui/ui/minified/labels.js',
        'resources/assets/libs/jquery-ui/ui/minified/form.js',
        'resources/assets/libs/jquery-ui/ui/minified/form-reset-mixin.js',
        'resources/assets/libs/jquery-ui/ui/widgets/checkboxradio.js',

        'resources/assets/js/common.min.js', // Всегда в конце
    ])
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify()) // Минимизировать весь js (на выбор)
        .pipe(gulp.dest('resources/assets/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'resources/assets'
        },
        notify: false,
        // tunnel: true,
        // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
    });
});

gulp.task('sass', function() {
    return gulp.src('resources/assets/sass/**/*.sass')
        .pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS()) // Опционально, закомментировать при отладке
        .pipe(gulp.dest('resources/assets/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('resources/assets/sass/**/*.sass', ['sass']);
    gulp.watch(['libs/**/*.js', 'resources/assets/js/common.js'], ['js']);
    gulp.watch('resources/assets/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
    return gulp.src('resources/assets/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('public/img'));
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

    var buildFiles = gulp.src([
        'resources/assets/*.html',
        'resources/assets/.htaccess',
    ]).pipe(gulp.dest('public'));

    var buildCss = gulp.src([
        'resources/assets/css/main.min.css',
    ]).pipe(gulp.dest('public/css'));

    var buildJs = gulp.src([
        'resources/assets/js/scripts.min.js',
    ]).pipe(gulp.dest('public/js'));

    var buildFonts = gulp.src([
        'resources/assets/fonts/**/*',
    ]).pipe(gulp.dest('public/fonts'));

});

gulp.task('deploy', function() {

    var conn = ftp.create({
        host:      'hostname.com',
        user:      'username',
        password:  'userpassword',
        parallel:  10,
        log: gutil.log
    });

    var globs = [
        'public/**',
        'public/.htaccess',
    ];
    return gulp.src(globs, {buffer: false})
        .pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync(['public/js', 'public/css']); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);