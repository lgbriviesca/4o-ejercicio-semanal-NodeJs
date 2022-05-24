const express = require('express');
const cors = require('cors');
const { globalErrorHandler } = require('./controllers/errorsController');

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { usersRouter } = require('./routes/userRoutes');
const { repairsRouter } = require('./routes/repairRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(compression());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
else app.use(morgan('combined'));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairsRouter);

app.use('*', globalErrorHandler);

module.exports = { app };
