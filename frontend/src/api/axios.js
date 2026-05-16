import axios from 'axios';


const api=axios.create({
    baseURL: 'http://localhost:8000/',
})



api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers['Authorization'] = `Bearer ${token}`;
    } 
    return config;
});

// by writint this file hame har api call ke sath token manually nhi bhejna padta , automatically tojen 
// add ho jayega har api caall ke sath 


export default api;