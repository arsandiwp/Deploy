import axios from 'axios';

// membuat base URL
export const API = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
});

// men set Auth Token 
export const setAuthToken = (token) => {
    if (token) {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete API.defaults.headers.common['Authorization'];
    }
}