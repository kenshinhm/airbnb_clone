import axios from 'axios';

const env = process.env.NODE_ENV;

let url = null;

if (env === 'development') {
    url = process.env.REACT_APP_API_URL;
} else {
    url = process.env.PUBLIC_URL;
}
const api = axios.create({
    baseURL: url
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers['Content-Type'] = "application/json";
        config.headers['Authorization'] = 'JWT ' + token;
    }
    return config;
});

// api.interceptors.request.use(function(config) {
//     config.headers = config.headers || {};
//     config.headers['Authorization'] =
//         'Bearer ' + 'f8576be5dd90005bdd2fb4aacd1fa4e360a70480';
//
//     return config;
// });

export default api;
