export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
export const apiUrl = (endpoint) => `${API_BASE_URL}/${endpoint}`;


