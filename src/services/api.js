import axios from 'axios';

// Use different URLs based on environment
const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000/api' // Local backend during development
  : 'https://finance-traker-backend-1-lsu8.onrender.com/api'; // Deployed backend in production

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
  (response) => {
    console.log(`Response received: ${response.status}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running.');
      alert('Backend server is not running. Please check if the backend is deployed and running.');
    } else if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default api;