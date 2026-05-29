const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FlightData = require('./models/FlightData');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/flightMonitor';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  const FlightSchema = new mongoose.Schema({
  altitude: Number, 
  his: Number,     
  adi: Number     
});

app.post('/api/FlightData', async (req, res) => {
  try {
    const newData = new FlightData(req.body);
    await newData.save();
    res.status(201).send('Data saved successfully');
  } catch (error) {
    res.status(500).send('Error saving data');
  }
});

app.get('/api/FlightData', async (req, res) => {
  const data = await FlightData.find().sort({_id: -1}).limit(1);
  res.json(data[0]);
});

app.listen(PORT, () => console.log('Server running on port ' + PORT));

app.get("/", (req, res) => {
  res.send("Node.js server is working");
});