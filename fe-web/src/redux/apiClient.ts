import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8000/api", // Adjust the base URL as needed
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Ensure the token is stored correctly
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
