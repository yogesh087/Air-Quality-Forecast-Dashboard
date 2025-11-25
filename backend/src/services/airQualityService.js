const axios = require('axios');
const { AQI_API_CONFIG } = require('../utils/constants');

class AirQualityService {
  constructor() {
    this.apiKey = process.env.AQI_API_KEY || 'demo';
    this.baseURL = 'https://api.waqi.info';
  }

  async fetchAirQualityData(city) {
    try {
      const response = await axios.get(
        `${this.baseURL}/feed/${encodeURIComponent(city)}/?token=${this.apiKey}`,
        { timeout: 10000 } // 10 second timeout
      );

      if (response.data.status === 'ok') {
        return this.transformResponseData(response.data);
      } else {
        throw new Error(this.getErrorMessage(response.data));
      }
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        throw new Error('Network error: Unable to reach air quality service');
      } else {
        throw new Error(`Service error: ${error.message}`);
      }
    }
  }

  transformResponseData(data) {
    const cityData = data.data;
    
    return {
      city: cityData.city.name,
      aqi: cityData.aqi || 0,
      dominantPollutant: cityData.dominentpol || 'N/A',
      time: {
        measurement: cityData.time?.s,
        timezone: cityData.time?.tz,
        timestamp: new Date().toISOString()
      },
      location: {
        latitude: cityData.city?.geo?.[0],
        longitude: cityData.city?.geo?.[1]
      },
      pollutants: this.extractPollutants(cityData.iaqi),
      forecast: this.extractForecast(cityData.forecast),
      attributions: cityData.attributions || []
    };
  }

  extractPollutants(iaqi) {
    if (!iaqi) return {};
    
    const pollutants = {};
    Object.keys(iaqi).forEach(key => {
      pollutants[key] = {
        name: this.getPollutantName(key),
        value: iaqi[key]?.v || 0,
        unit: this.getPollutantUnit(key)
      };
    });
    
    return pollutants;
  }

  extractForecast(forecast) {
    if (!forecast?.daily) return null;

    const dailyForecast = {};
    Object.keys(forecast.daily).forEach(pollutant => {
      dailyForecast[pollutant] = forecast.daily[pollutant]
        .slice(0, 3) // Next 3 days
        .map(day => ({
          date: day.day,
          average: day.avg,
          max: day.max,
          min: day.min
        }));
    });

    return { daily: dailyForecast };
  }

  getPollutantName(code) {
    const names = {
      pm25: 'PM2.5',
      pm10: 'PM10',
      o3: 'Ozone',
      no2: 'Nitrogen Dioxide',
      so2: 'Sulfur Dioxide',
      co: 'Carbon Monoxide',
      dew: 'Dew',
      h: 'Humidity',
      p: 'Pressure',
      t: 'Temperature',
      w: 'Wind'
    };
    
    return names[code] || code;
  }

  getPollutantUnit(code) {
    const units = {
      pm25: 'μg/m³',
      pm10: 'μg/m³',
      o3: 'μg/m³',
      no2: 'μg/m³',
      so2: 'μg/m³',
      co: 'mg/m³',
      dew: '°C',
      h: '%',
      p: 'hPa',
      t: '°C',
      w: 'm/s'
    };
    
    return units[code] || 'unit';
  }

  getErrorMessage(data) {
    if (data.data === 'Unknown station') {
      return 'City not found. Please check the city name and try again.';
    }
    return data.data || 'Unknown API error';
  }
}

module.exports = new AirQualityService();