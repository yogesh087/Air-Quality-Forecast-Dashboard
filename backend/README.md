# Air Quality Backend API

A Node.js backend service that provides real-time air quality data with caching capabilities.

## Features

- RESTful API design
- Real-time air quality data from WAQI API
- MongoDB caching with automatic expiration
- Rate limiting and security headers
- Error handling and validation
- MVC architecture

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- WAQI API token

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd backend

2. Install dependencies
npm install

3. Create environment file
cp .env
 
4. Update .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/airquality
AQI_API_KEY=your_api_key_here
NODE_ENV=development
CACHE_TTL=1800000
MAX_CACHE_ENTRIES=1000

##Getting WAQI API Key

 1.Visit https://aqicn.org/api/

2.Sign up for a free account

3.Get your API token from the dashboard

4.Add it to the .env file


 
##Running the Application
Development
npm run dev

 ##API Endpoints

1. Health Check
GET /api/health

2. Search Air Quality
GET /api/air-quality/search/:city

3. Cache Management
GET /api/cache/stats
DELETE /api/cache/clear


## Response Format

 {
  "city": "London",
  "aqi": 45,
  "dominantPollutant": "pm25",
  "time": {
    "measurement": "2023-12-07T10:00:00Z",
    "timezone": "GMT"
  },
  "pollutants": {
    "pm25": {
      "name": "PM2.5",
      "value": 12.5,
      "unit": "μg/m³"
    }
  },
  "forecast": {
    "daily": {
      "pm25": [
        {
          "date": "2023-12-08",
          "average": 13.2,
          "max": 15.1,
          "min": 11.8
        }
      ]
    }
  },
  "cached": false
}
