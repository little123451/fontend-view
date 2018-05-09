let express = require('express');
let logger = require('morgan');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
let compression = require('compression');
let app = express();

// 压缩返回文件
app.use(compression());

// 路由
let routes = {
  "index" : require('./routes/index'),
  "api" : require('./routes/api')
};
app.use('/index', routes.index);
app.use('/api', routes.api);

// 设置页面解析引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 覆盖默认的 X-Powered-By HTTP返回头
app.use(function (req, res, next) {
  res.set('X-Powered-By','DataHunter');
  next();
});

// 日志记录
app.use(logger('dev'));

// Content-Type 的处理
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Cookies 的处理
app.use(cookieParser());
app.use(session({
  name : 'SESSIONID',
  secret : 'whosyourdaddy',
  saveUninitialized: true,
  resave: false
}));

// 静态文件处理
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
      message: err.message,
      error: err
    }));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

module.exports = app;
