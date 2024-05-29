import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstanceLogin = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'text/plain',
  },
});

export { axiosInstance, axiosInstanceLogin };
