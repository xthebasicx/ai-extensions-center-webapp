import axios from 'axios'

const API_URL = 'http://localhost:5000/api/Extensions'

export const ExtensionService = {
    async fetchExtensions(pageNumber = 1, pageSize = 10) {
        try {
            const response = await axios.get(API_URL, { params: { pageNumber, pageSize } })
            return response.data
        } catch (error) { }
    },
    async fetchExtensionById(extensionId) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_URL}/${extensionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            return response.data
        } catch (error) { }
    },
    async fetchExtensionByUserId(pageNumber = 1, pageSize = 10) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_URL}/user`, {
                params: { pageNumber, pageSize },
                headers: { 'Authorization': `Bearer ${token}` }
            })
            return response.data
        } catch (error) { }
    },
    async createExtension(extension) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(API_URL, extension, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        } catch (error) { throw error }
    },
    async updateExtension(extensionId, extension) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put(`${API_URL}/${extensionId}`, extension, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            return response.data
        } catch (error) { }
    },
    async uploadImage(formData) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(`${API_URL}/upload-image`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data
        } catch (error) { }
    },
    async deleteExtension(extensionId) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`${API_URL}/${extensionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        } catch (error) { }
    }
}
