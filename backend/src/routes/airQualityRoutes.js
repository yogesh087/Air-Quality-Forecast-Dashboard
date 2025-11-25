const express = require('express');
const airQualityController = require('../controller/airQualityConroller');

const router = express.Router();

// Search for air quality by city
router.get(
  '/search/:city',
  airQualityController.validateCity,
  airQualityController.searchCity
);

module.exports = router;