import axios from 'axios';

// Function to determine the base URL based on environment
const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // If running in Docker (VITE_API_URL is /api)
  if (apiUrl === '/api') {
    return apiUrl;
  }
  
  // If running locally (or custom URL provided)
  return apiUrl || 'http://localhost:5000/api';
};

const baseURL = getBaseUrl();
console.log('API Base URL:', baseURL);

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 