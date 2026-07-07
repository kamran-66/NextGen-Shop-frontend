import axios from "axios";

const api = axios.create({
   
    baseURL: 'http://ecommerce_backend.test/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':'Bearer 6|1t82OLbh228zIJwTjDRSbU2XhBcheseOpWgHDajk7eb6b63a'
    }
});


        api.interceptors.request.use(config => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;