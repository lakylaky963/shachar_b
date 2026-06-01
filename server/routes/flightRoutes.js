const express = require('express');
const { createFlightData, getLatestFlightData } = require('../controllers/flightController');

const router = express.Router();

// כאן מגדירים את הנתיבים של ה-API לטיסות.
router.post('/api/flightData', createFlightData);
router.get('/api/flightData', getLatestFlightData);

module.exports = router;
