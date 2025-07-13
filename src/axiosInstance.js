import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9191', // Your backend URL
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