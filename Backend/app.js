var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRouter = require('./routes/AuthRoutes');

// Import the new ShelterPet routes
const shelterPetRoutes = require('./routes/shelterPetRoutes'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const veterinarianRouter = require('./routes/veterinarian');
const HealthRecordRouter = require('./routes/HealthRecordRoutes');
const AppointmentRouter = require('./routes/AppointmentRoutes');
const ShelterRoutes = require('./routes/ShelterRoutes');
const feedbackRouter = require('./routes/Feedback.Route'); 




var app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/PetCare';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(`Could not connect to MongoDB... ${err}`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/vets', veterinarianRouter);
app.use('/api/health-records', HealthRecordRouter);
app.use('/api/appointments', AppointmentRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/Shelter', ShelterRoutes);
app.use('/api/shelter-pets', shelterPetRoutes);
app.use('/api/feedbacks', feedbackRouter);


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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});