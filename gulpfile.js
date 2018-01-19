var gulp = require('gulp');
var less = require('gulp-less');
var mincss = require('gulp-clean-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var sequence = require('gulp-sequence');
var imagemin = require('gulp-imagemin');
var pump = require('pump');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

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

// 编译LESS并压缩CSS
gulp.task('mincss', function () {
    return gulp.src('src/less/**/*.less')
        .pipe(less())
        .pipe(mincss())
        .pipe(gulp.dest('public/stylesheets/'))
        .pipe(reload({stream: true}));
});

// 对Jade文件重命名
gulp.task('pug',function () {
    return gulp.src('src/views/**/*.jade')
        .pipe(rename({extname: '.pug'}))
        .pipe(gulp.dest('views/'))
        .pipe(reload({stream: true}));
});

// 压缩JS文件
gulp.task('uglify', function(){
    return gulp.src(['src/javascript/**/*.js','!src/javascript/lib/**/*.js'])
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/javascript/'))
        .pipe(reload({stream: true}));
});

// 压缩图片
gulp.task('imagemin', function(){
    return gulp.src('src/images/**/*')
        //.pipe(imagemin())
        .pipe(gulp.dest('public/images/'));
});

// 抽取Bower中安装的前端库
gulp.task('lib', function(){
    var src = 'src/javascript/lib/', dist = 'public/javascript/lib/';
    gulp.src( src + 'jquery/dist/jquery.min.js').pipe(gulp.dest(dist + 'jquery/dist'));
    gulp.src( src + 'requirejs/require.js').pipe(gulp.dest(dist + 'requirejs'));
    gulp.src( src + 'moment/min/moment.min.js').pipe(gulp.dest(dist + 'moment/min'));
    gulp.src([
        src + 'bootstrap-daterangepicker/daterangepicker.js',
        src + 'bootstrap-daterangepicker/daterangepicker.css'
    ]).pipe(gulp.dest(dist + 'bootstrap-daterangepicker/'));
});

// 构建
gulp.task('build', sequence(['clean'],['mincss', 'pug', 'lib', 'uglify','imagemin']));

// 测试启动服务
gulp.task('server', ['build'], function(){

    gulp.watch(['src/views/**/*.jade'], ['pug']);
    gulp.watch(['src/less/**/*.less'], ['mincss']);
    gulp.watch(['src/javascript/**/*.js'], ['uglify']);

    nodemon({
        script: 'bin/www.js',
        ext: 'js',
        ignore: ['src/*','public/*','log/*'],
        env: { 'NODE_ENV' : 'development' }
    }).on('start', function(){
        browserSync.init({port: 3300, proxy: "localhost:3000"});
    })
});