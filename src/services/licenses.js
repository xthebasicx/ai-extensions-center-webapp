import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL
const API_URL = `${BASE_URL}/api/Licenses`;

export const LicenseService = {
    async fetchLicensesByExtensionId(extensionId) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_URL}/extension/${extensionId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            return response.data
        } catch (error) { }
    },

    async createLicense(license) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(API_URL, license, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { }
    },

    async updateLicense(licenseId, license) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.put(`${API_URL}/${licenseId}`, license, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            return response.data;
        } catch (error) { }
    },

    async deleteLicense(licenseId) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`${API_URL}/${licenseId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { }
    },
    async deactivateLicense(licenseId) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(`${API_URL}/${licenseId}/deactivate`, licenseId, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { }
    },
    async sendLicenseEmail(license) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(`${API_URL}/send-license`, license, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        }
        catch (error) { }
    }
};