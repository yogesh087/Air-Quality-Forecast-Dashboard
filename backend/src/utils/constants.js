const AQI_API_CONFIG = {
  BASE_URL: 'https://api.waqi.info',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3
};

const CACHE_CONFIG = {
  TTL: 30 * 60 * 1000, // 30 minutes
  MAX_ENTRIES: 1000,
  CLEANUP_INTERVAL: 60 * 60 * 1000 // 1 hour
};

const AQI_LEVELS = {
  GOOD: { min: 0, max: 50, level: 'Good', color: '#00E400' },
  MODERATE: { min: 51, max: 100, level: 'Moderate', color: '#FFFF00' },
  UNHEALTHY_SENSITIVE: { min: 101, max: 150, level: 'Unhealthy for Sensitive Groups', color: '#FF7E00' },
  UNHEALTHY: { min: 151, max: 200, level: 'Unhealthy', color: '#FF0000' },
  VERY_UNHEALTHY: { min: 201, max: 300, level: 'Very Unhealthy', color: '#8F3F97' },
  HAZARDOUS: { min: 301, max: 500, level: 'Hazardous', color: '#7E0023' }
};

module.exports = {
  AQI_API_CONFIG,
  CACHE_CONFIG,
  AQI_LEVELS
};