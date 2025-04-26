import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/api/Ruby`;

export const RubyService = {
    async downloadRubyFile(extensionId, moduleName) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_URL}/download`, {
                params: { extensionId, moduleName },
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                responseType: 'blob'
            });
            return response.data;
        } catch (error) { }
    }
};
