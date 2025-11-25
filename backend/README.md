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
 
  4 Update .env file:

  PORT=5000
MONGODB_URI=mongodb://localhost:27017/airquality
AQI_API_KEY=your_api_key_here
NODE_ENV=development
CACHE_TTL=1800000
MAX_CACHE_ENTRIES=1000

5 Running the Application
Development
npm run dev