import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3006/api1';

axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config;         //有无token都需要添加
}, function (err) {
    return Promise.reject(err);
})