import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.nyp.id",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor: otomatis attach token ke setiap request
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default axiosInstance;

