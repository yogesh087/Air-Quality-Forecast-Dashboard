const airQualityService = require('../services/airQualityService');
const cacheService = require('../services/cacheService');

class AirQualityController {
  async searchCity(req, res, next) {
    try {
      const { city } = req.params;

      if (!city || city.trim().length === 0) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'City name is required and cannot be empty'
        });
      }

       
      const cachedData = await cacheService.getCachedData(city);
      
      if (cachedData) {
        console.log('Serving from cache:', city);
        return res.json({
          ...cachedData,
          cached: true,
          cacheTimestamp: new Date().toISOString()
        });
      }
 
      console.log('Fetching from API:', city);
      const airQualityData = await airQualityService.fetchAirQualityData(city);
      
      // Cache the result (non-blocking)
      cacheService.setCachedData(city, airQualityData);

      res.json({
        ...airQualityData,
        cached: false
      });

    } catch (error) {
      next(error);
    }
  }

  async validateCity(req, res, next) {
    const { city } = req.params;
    
   
    if (!city || typeof city !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'City parameter must be a non-empty string'
      });
    }

    if (city.length > 100) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'City name is too long'
      });
    }

   
    req.params.city = city.trim();
    next();
  }
}

module.exports = new AirQualityController();