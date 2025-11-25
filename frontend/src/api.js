import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

export const airQualityAPI = {
  async searchCity(city) {
    const response = await api.get(`/api/air-quality/search/${encodeURIComponent(city)}`)
    return response.data
  }
}