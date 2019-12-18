var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// ����һ��expressʵ�� app
var app = express();

// ���� views �ļ���Ϊ�����ͼ�ļ���Ŀ¼, �����ģ���ļ��ĵط�,__dirname Ϊȫ�ֱ���,�洢��ǰ����ִ�еĽű����ڵ�Ŀ¼��
app.set('views', path.join(__dirname, 'views'));
// ������ͼģ������Ϊ ejs
app.set('view engine', 'ejs');

// app.use(favicon(__dirname + '/public/favicon.ico��)); // ����/public/favicon.icoΪfaviconͼ�ꡣ

app.use(logger('dev')); // ������־�м��
app.use(express.json()); //���ؽ���json���м��
app.use(express.urlencoded({ extended: false })); // ���ؽ���urlencoded��������м��
app.use(cookieParser()); //���ؽ���cookie���м��
app.use(express.static(path.join(__dirname, 'public'))); // ����public�ļ���Ϊ��ž�̬�ļ���Ŀ¼

// ·�ɿ�����
app.use('/', indexRouter);
app.use('/users', usersRouter);

// ����404���󣬲�ת��������������
app.use(function(req, res, next) {
  next(createError(404));
});

// ���������µĴ�����������������Ϣ��Ⱦerrorģ�沢��ʾ���������
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
