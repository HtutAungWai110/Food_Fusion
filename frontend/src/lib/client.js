import axios from 'axios';
import { Navigate } from 'react-router-dom';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
});

apiClient.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 401) {
    window.location.href = "/session-expired";
  }
  return Promise.reject(error);
});

export default apiClient;