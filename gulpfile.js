let gulp = require('gulp');
let less = require('gulp-less');
let mincss = require('gulp-clean-css');
let clean = require('gulp-clean');
let nodemon = require('gulp-nodemon');
let sequence = require('gulp-sequence');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let browserify = require('gulp-browserify');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

// 清除构建文件夹中的内容
gulp.task('clean', function () {
    return gulp.src([
        'public/stylesheets/',  // css
        'views/',               // pug
        'public/javascript/',   // js
        'public/images/'        // img
    ], {read: false})
        .pipe(clean());
});

// 使用Babel转换ES6语法和jsx
gulp.task('babel', function(){
    return gulp.src([
        'src/javascript/**/*.jsx',
        'src/javascript/**/*.js'
    ]).pipe(babel({
        presets:['env'],
        plugins:['transform-react-jsx']
    }))
    .pipe(gulp.dest('public/javascript/'));
});

// 使用 Browserify 整合 React 的依赖并压缩
gulp.task('react', ['babel'], function(){
    return gulp.src(['public/javascript/*.js'])
        .pipe(browserify({debug: true}))
        // Make React available externally for dev tools
        .on('prebundle', function(bundler) {bundler.require('react');})
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/javascript/'))
        .pipe(reload({stream: true}));
});

// 简单地移动页面文件
gulp.task('views', function(){
    return gulp.src('src/views/**/*.pug')
        .pipe(gulp.dest('views/'))
        .pipe(reload({stream: true}))
});

// 编译LESS并压缩CSS
gulp.task('mincss', function () {
    return gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(reload({stream: true}));
});

// 压缩图片
gulp.task('imagemin', function(){
    return gulp.src('src/images/**/*')
        //.pipe(imagemin())
        .pipe(gulp.dest('public/images/'));
});

// 构建
gulp.task('build', sequence(['clean'],['mincss','imagemin','views', 'react']));

// 测试启动服务
gulp.task('server', ['build'], function(){

    gulp.watch(['src/views/**/*.pug'], ['view']);
    gulp.watch(['src/less/**/*.less'], ['mincss']);
    gulp.watch(['src/javascript/**/*.js'], ['react']);

    nodemon({
        script: 'bin/www.js',
        ext: 'js',
        ignore: ['src/*','public/*','log/*'],
        env: { 'NODE_ENV' : 'development' }
    }).on('start', function(){
        browserSync.init({port: 3300, proxy: "localhost:3000"});
    })
});