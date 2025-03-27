import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Users';

export const AuthService = {
    async login(user) {
        try {
            const response = await axios.post(`${API_URL}/login`, user);
            AuthService.setTokens(response.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async refreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            AuthService.logout();
            return
        }
        try {
            const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
            AuthService.setTokens(response.data);
            return response.data.accessToken;
        } catch (error) {
            AuthService.logout();
            return
        }
    },

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpires');
    },

    setTokens(data) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('tokenExpires', Date.now() + data.expiresIn * 1000);
    }
};
