import axios from 'axios';
import { AuthService } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('accessToken');
        const tokenExpires = localStorage.getItem('tokenExpires');

        if (tokenExpires && Date.now() >= tokenExpires) {
            token = await AuthService.refreshToken();
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            AuthService.logout();
        }
        return Promise.reject(error);
    }
);

export default api;
