const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

const { sequelize } = require('../database/models');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json())

app.listen(8000);

// sequelize.sync({ force: false })
//     .then(() => {
//         console.log("DB Connect");
//     })
//     .catch((err) => {
//         console.error(err);
//     })