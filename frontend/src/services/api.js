import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const signupUser = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const logoutUser = async () => {
    await api.post('/auth/logout');
};

export const updatePassword = async (newPassword) => {
    const response = await api.post('/users/update-password', { newPassword });
    return response.data;
};

export const getStores = async (params = {}) => {
    const response = await api.get('/users/stores', { params });
    return response.data;
};

export const getStoreDetails = async (id) => {
    const response = await api.get(`/users/stores/${id}`);
    return response.data;
};

export const submitRating = async (storeId, rating) => {
    const response = await api.post(`/users/stores/${storeId}/rate`, { rating });
    return response.data;
};

// Admin API calls
export const addStoreAdmin = async (storeData) => {
    const response = await api.post('/admin/stores', storeData);
    return response.data;
};

export const addUserAdmin = async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
};

export const getAdminDashboardData = async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
};

export const getUsersAdmin = async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
};

export const getStoresAdminList = async (params = {}) => {
    const response = await api.get('/admin/stores', { params });
    return response.data;
};

export const getUserDetailsAdmin = async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
};

export const getStoreDetailsAdmin = async (id) => {
    const response = await api.get(`/admin/stores/${id}`);
    return response.data;
};

// Store Owner API calls
export const getOwnerDashboardData = async () => {
    const response = await api.get('/owner/dashboard');
    return response.data;
};

export const updateOwnerPassword = async (newPassword) => {
    const response = await api.post('/owner/update-password', { newPassword });
    return response.data;
};
