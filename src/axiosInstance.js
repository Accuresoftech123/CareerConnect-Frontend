import axios from 'axios';

export const baseURL = 'http://14.96.203.178:9191';
//export const baseURL = 'http://localhost:9191';

const instance = axios.create({
  baseURL, // Your backend URL
  // withCredentials: true  // add this
});

// Attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("axios instance token ",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;