import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // baseURL: 'https://backends.xyz/',
});

// api.interceptors.request.use(function(config) {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers['Authorization'] = 'Bearer ' + token;
//   }
//   return config;
// });

// api.interceptors.request.use(function(config) {
//     config.headers = config.headers || {};
//     config.headers['Authorization'] =
//         'Bearer ' + 'f8576be5dd90005bdd2fb4aacd1fa4e360a70480';
//
//     return config;
// });

export default api;
