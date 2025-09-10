var createError = require('http-errors');
require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); // Thêm dòng này

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const veterinarianRouter = require('./routes/veterinarian');

const authRouter = require('./routes/AuthRoutes');


var app = express();

// Bật CORS
app.use(cors()); // Thêm dòng này

mongoose.connect('mongodb://127.0.0.1:27017/PetCare') //nhớ check kỹ nha mấy a mấy chị 😁
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(`Could not connect to MongoDB... ${err}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/vets', veterinarianRouter); // Lưu ý: route đúng là /api/vets, không phải /vets

app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;