var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
// --- Import Models ---
require('./models/Owner');
require('./models/Pet');
require('./models/Appointment');
// Thêm các models khác nếu có

// --- Import Routes ---
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const veterinarianRouter = require('./routes/veterinarian');
const HealthRecordRouter = require('./routes/HealthRecordRoutes');
const AppointmentRouter = require('./routes/AppointmentRoutes');
const AuthRouter = require('./routes/AuthRoutes');
const ShelterRoutes = require('./routes/ShelterRoutes');
const logRoutes = require('./routes/LogRoutes');
const feedbackRouter = require('./routes/Feedback.Route');
const LPO = require('./routes/LPORoutes');
const apptOwnerRouter = require('./routes/Appointment_owner.routes');
const shelterPetRoutes = require('./routes/ShelterPetRoutes'); // ✅ đã được gộp lại

var app = express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200
};

// --- Middleware Setup ---
app.use(express.json());
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static("uploads"));

// --- Database Connection ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/PetCare';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error(`Could not connect to MongoDB... ${err}`));

// --- View Engine Setup ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// --- API Routes ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/vets', veterinarianRouter);
app.use('/api/health-records', HealthRecordRouter);
app.use('/api/appointments', AppointmentRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/shelter', ShelterRoutes);
app.use('/api/appointments_owner', apptOwnerRouter);
app.use('/api/shelter-pets', shelterPetRoutes);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/lpos', LPO);

app.use('/api/owners', require('./routes/owners.routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.status(404).json({ message: 'Route not found' });
  res.render('error');
});

// --- Server Startup ---
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log(listEndpoints(app));