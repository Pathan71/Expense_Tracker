import axios from 'axios'
import { BASE_URL } from './apiPath'

const axiosIntance = axios.create({
    baseURL: BASE_URL,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

// Requiset Interceptor
axiosIntance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);

// Response Interceptor
axiosIntance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                // Redirect to login page
                window.location.href = '/login'
            }
            else if (error.code === 'ECONNABOARTED') {
                console.log('Requiset timeout. Please try again.')
            }
            return Promise.reject(error)
        }
    }
);

export default axiosIntance;