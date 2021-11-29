import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000'

const instanceAPI = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

instanceAPI.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Token ${localStorage.getItem('token')}`
    return config;
}, function (error) {
    // Do something with request error
    console.log(error)
});

export default instanceAPI;