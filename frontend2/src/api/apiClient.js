import axios from 'axios'

const BASE_URL = "/api/v1";

export const apiClient = axios.create({
    baseURL : BASE_URL,
    headers : {
        "Content-Type" : "application/json",
    },
    
})

apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use((response)=> response.data,
(error)=>{
    const message  = error.response?.data?.message || error.message || `Request failed with status ${error.response?.status}`;
    console.warn(`[API Client Warning] Request to ${error.config?.url} failed:`, message);
    return Promise.reject(new Error(message));
});



export default apiClient;


