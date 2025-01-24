import axios from 'axios'

const axiosClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://shopinn-api.onrender.com/api/': 'http://localhost:8000/api/',
})

axiosClient.interceptors.request.use((config) =>{
    const token  = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`

    return config
})
export default axiosClient 