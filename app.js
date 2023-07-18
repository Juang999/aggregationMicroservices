require('dotenv').config({
  path: './'
})

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = 3001
var upload = require('express-fileupload')
var route = require('./routes/route')

var adminRoute = {
  SalesQuotationRoute: require('./routes/Admin/sales-quotation'),
  VisitRouter: require('./routes/Admin/visit')
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PkRouter = require('./routes/Client/product-knowledge');
var partnerRouter = require('./routes/Client/partner');
var planRouter = require('./routes/Client/plans');
var masterRouter = require('./routes/master');
var partnerAddressRouter = require('./routes/Client/partner-address');
var partnerContactRouter = require('./routes/Client/partner-contact-address');
var visitRouter = require('./routes/Client/visit');
var salesQuotationRoutes = require('./routes/Client/sales-quotation')

var app = express();

// file upload
app.use(upload())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/PK', PkRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/plans', planRouter);
app.use('/api/master', masterRouter);
app.use('/api/address-partner', partnerAddressRouter);
app.use('/api/contact-address-partner', partnerContactRouter);
app.use('/api/visit', visitRouter);
app.use('/api/sales-quotation', salesQuotationRoutes)

app.use(`${route.route_default}${route.Admin.route_admin}`, adminRoute.VisitRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`System started on ${process.env.HOST}:${process.env.PORT}`)
})

module.exports = app;
