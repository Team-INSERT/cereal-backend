const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors')

dotenv.config();
const app = express();
const indexRouter = require('./api');
const userRouter = require('./api/user');
const resRouter = require('./api/response');

app.use(cors());
app.use(express.json())
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/res', resRouter);

app.listen(8000);