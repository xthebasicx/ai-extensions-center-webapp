import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/api/Users`;

export const UserService = {
    async register(user) {
        try {
            return await axios.post(`${API_URL}/register`, user);
        } catch (error) {
            throw error;
        }
    }
};
