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
    if (error.response?.status === 401) {
        console.error("Authentication token expired or invalid. Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("moexpress_cart");
        localStorage.removeItem("moexpress_wishlist");
        window.dispatchEvent(new Event("storage"));
        
        if (window.location.pathname !== "/login") {
             window.location.href = "/login?expired=true";
        }
    }
    const message  = error.response?.data?.message || error.message || `Request failed with status ${error.response?.status}`;
    console.warn(`[API Client Warning] Request to ${error.config?.url} failed:`, message);
    return Promise.reject(new Error(message));
});



export default apiClient;



