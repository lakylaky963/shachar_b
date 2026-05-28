const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/flightMonitor')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

  