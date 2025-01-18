// app/utils/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://your-api-url.com', // Replace with your API base URL
});

apiClient.interceptors.request.use(
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

export default apiClient;
