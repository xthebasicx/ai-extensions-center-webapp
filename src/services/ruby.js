import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Ruby';

export const RubyService = {
    async downloadRubyFile(extensionId) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_URL}/download`, {
                params: { extensionId },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });
            return response.data;
        } catch (error) { }
    }
};
