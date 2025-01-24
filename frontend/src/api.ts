// src/api.js
import axios from "axios";

// Create a custom axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Use environment variable for base URL
    timeout: 10000, // Set a timeout for requests (optional)
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add authorization token (if available) to every request
        const token = localStorage.getItem("token"); // Example: Get token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Handle successful responses
        return response.data; // Return only the data part of the response
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with a status code outside 2xx
            console.error("API Error:", error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error("Network Error:", error.request);
            return Promise.reject({ message: "Network Error. Please check your connection." });
        } else {
            // Something happened in setting up the request
            console.error("Request Error:", error.message);
            return Promise.reject({ message: "An unexpected error occurred." });
        }
    }
);

export default api;