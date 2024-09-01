const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const copy = require('gulp-copy');
const replace = require('gulp-replace');
const tsc = require('gulp-typescript');
const uglify = require('gulp-uglify'); 
const browserSync = require('browser-sync');

// ##### GENERAL TASKS #####

// *** DIST ***

//STYLES
gulp.task('styles', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass()) 
        .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist/styles'));

})

//HTML
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(replace('styles.css', 'styles.min.css'))
         .pipe(gulp.dest('dist'));
})

//SCRIPTS
gulp.task('scripts', () => {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(tsc({
            noImplicitAny: true,
            target: 'es6',
            isolatedModules: true
        }))
        .pipe(replace(/\sfrom '(\.\/[^']+)'/g, "from '$1.js'"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))

})

// *** DEV ***

//STYLES 
gulp.task('styles:dev', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass()) 
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('dist/styles'));


})

gulp.task('html:dev', () => {
    return gulp.src('src/*.html')
         .pipe(gulp.dest('dist'));
})

//SCRIPTS
gulp.task('scripts:dev', () => {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(tsc({
            noImplicitAny: true,
            target: 'es6',
            isolatedModules: true
        }))
        .pipe(replace(/\sfrom '(\.\/[^']+)'/g, "from '$1.js'"))
        .pipe(gulp.dest('dist/scripts'))

})


// ##### ASSETS #####
gulp.task('assets', () =>{
    return gulp.src('src/assets/**/*')
        .pipe(copy('dist', {prefix: 2})) 
})

// ##### JSON #####
gulp.task('jsonFiles', () => {
    return gulp.src('src/json/**/*.json')
        .pipe(gulp.dest('dist/json'));


})


// ##### BROWSER SYNC #####
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src', gulp.series('build:dev')).on('change', browserSync.reload);
});


// ##### BUILD'S #####

//DIST
gulp.task('default', gulp.series('styles', 'assets', 'html', 'scripts', 'jsonFiles'));


//DEV
gulp.task('build:dev', gulp.series('styles:dev', 'assets', 'html:dev', 'scripts:dev', 'jsonFiles'));

