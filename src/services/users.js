import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Users';

export const UserService = {
    async register(user) {
        try {
            return await axios.post(`${API_URL}/register`, user);
        } catch (error) {
            throw error;
        }
    }
};
