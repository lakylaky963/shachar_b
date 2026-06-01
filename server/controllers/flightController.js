const FlightData = require('../models/FlightData');

const ALTITUDE_LIMIT = 3000;
const HIS_LIMIT = 360;
const ADI_LIMIT = 100;

// בודק אם הערכים נמצאים בטווחים המותרים.
const validateFlightData = (altitude, his, adi) => {
  return (
    typeof altitude === 'number' &&
    typeof his === 'number' &&
    typeof adi === 'number' &&
    altitude >= 0 && altitude <= ALTITUDE_LIMIT &&
    his >= 0 && his <= HIS_LIMIT &&
    adi >= -ADI_LIMIT && adi <= ADI_LIMIT
  );
};

// POST /api/flightData
const createFlightData = async (req, res) => {
  try {
    const { altitude, his, adi } = req.body;

    if (!validateFlightData(altitude, his, adi)) {
      return res.status(400).json({ error: 'Invalid flight data values' });
    }

    const newData = new FlightData({ altitude, his, adi });
    await newData.save();

    res.status(201).json({ message: 'Data saved successfully', data: newData });
  } catch (error) {
    res.status(500).json({ error: 'Error saving data' });
  }
};

// GET /api/flightData
const getLatestFlightData = async (_req, res) => {
  try {
    const data = await FlightData.find().sort({ _id: -1 }).limit(1);
    res.json(data[0] || {});
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
};

module.exports = { createFlightData, getLatestFlightData };
