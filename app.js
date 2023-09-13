var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var upload = require('express-fileupload')
var route = require('./routes/route')
var cors = require('cors')

var adminRoute = {
  SalesQuotationRoute: require('./routes/Admin/sales-quotation'),
  VisitRouter: require('./routes/Admin/visit')
}

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var masterRouter = require('./routes/master');
var planRouter = require('./routes/Client/plans');
var visitRouter = require('./routes/Client/visit');
var reportRouter = require('./routes/Client/report');
var partnerRouter = require('./routes/Client/partner');
var productKnowlegeRouter = require('./routes/product');
var PkRouter = require('./routes/Client/product-knowledge');
var pointOfSalesRouter = require('./routes/Client/point-of-sales');
var salesQuotationRoutes = require('./routes/Client/sales-quotation');
var partnerAddressRouter = require('./routes/Client/partner-address');
var partnerContactRouter = require('./routes/Client/partner-contact-address');

var app = express();

// file upload
app.use(upload())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  

app.use('/', indexRouter);
app.use('/api/PK', PkRouter);
app.use('/api/plans', planRouter);
app.use('/api/visit', visitRouter);
app.use('/api/users', usersRouter);
app.use('/api/master', masterRouter);
app.use('/api/report', reportRouter);
app.use('/api/partner', partnerRouter);
app.use('/api/point-of-sales', pointOfSalesRouter);
app.use('/api/address-partner', partnerAddressRouter);
app.use('/api/sales-quotation', salesQuotationRoutes);
app.use('/api/product-knowledge', productKnowlegeRouter);
app.use('/api/contact-address-partner', partnerContactRouter);

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

module.exports = app;
