import axios from 'axios';

// Use different URLs based on environment
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000/api' // Local backend during development
  : 'https://finance-traker-backend-hqfz.onrender.com/api'; // Deployed backend in production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running.');
      alert('Backend server is not running. Please start the backend.');
    }
    return Promise.reject(error);
  }
);

export default api;
