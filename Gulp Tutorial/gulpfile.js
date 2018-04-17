var gulp                = require('gulp'),
    browserSync         = require('browser-sync'),
    gulpSass            = require('gulp-sass'),
    gulpSourcemaps      = require('gulp-sourcemaps'),
    gulpAutoprefixer    = require('gulp-autoprefixer'),
    gulpCleanCSS        = require('gulp-clean-css'),
    gulpUglify          = require('gulp-uglify'),
    gulpConcat          = require('gulp-concat'),
    gulpImagemin        = require('gulp-imagemin'),
    gulpChanged         = require('gulp-changed'),
    gulpHTMLReplace     = require('gulp-html-replace'),
    gulpHTMLMin         = require('gulp-htmlmin'),
    del                 = require('del'),
    runSequence         = require('run-sequence');     


var config = {
    dist:           './dist/',
    src:            './src/',
    cssin:          './src/css/**/*.css',
    jsin:           './src/js/**/*.js',
    imgin:          './src/img/**/*.{jpg,jpeg,png,gif}',
    htmlin:         './src/*.html',
    scssin:         './src/scss/**/*.scss',
    cssout:         './dist/css/',
    jsout:          './dist/js/',
    imgout:         './dist/img/',
    htmlout:        './dist/',
    scssout:        './src/css/',
    cssoutname:     'style.css',
    jsoutname:      'script.js',
    cssreplaceout:  './css/style.css',
    jsreplaceout:   './js/script.js'
};

gulp.task('reload', function() {
    browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
    browserSync({
        server: config.src
    })
    gulp.watch([config.htmlin, config.jsin], ['reload']);
    gulp.watch(config.scssin, ['sass']);
});

gulp.task('sass', function() {
    return gulp.src(config.scssin)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpSass().on('error', gulpSass.logError))
        .pipe(gulpAutoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(config.scssout))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src(config.cssin)
        .pipe(gulpConcat(config.cssoutname))
        .pipe(gulpCleanCSS())
        .pipe(gulp.dest(config.cssout));
});

gulp.task('js', function() {
    return gulp.src(config.jsin)
        .pipe(gulpConcat(config.jsoutname))
        .pipe(gulpUglify())
        .pipe(gulp.dest(config.jsout));
});

gulp.task('img', function() {
    return gulp.src(config.imgin)
        .pipe(gulpChanged(config.imgout))
        .pipe(gulpImagemin())
        .pipe(gulp.dest(config.imgout));
});

gulp.task('html', function() {
    return gulp.src(config.htmlin)
        .pipe(gulpHTMLReplace({
            'css': config.cssreplaceout,
            'js': config.jsreplaceout
        }))
        .pipe(gulpHTMLMin({
            sortAttributes: true,
            sortClassName: true,
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(config.htmlout));
});

gulp.task('clean', function() {
    return del([config.dist]);
});

gulp.task('build', function() {
    runSequence('clean', ['html', 'js', 'css', 'img']);
});

gulp.task('default', ['serve']);
