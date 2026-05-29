const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  altitude: { type: Number, required: true }, 
  his: { type: Number, required: true },     
  adi: { type: Number, required: true }     
});

module.exports = mongoose.model('FlightData', FlightSchema);