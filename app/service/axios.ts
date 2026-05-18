import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.nyp.id",
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

// Interceptor: handle 401 Unauthorized
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check if the URL is a public endpoint
            const isPublicEndpoint = error.config.url?.includes("/public");

            if (!isPublicEndpoint) {
                const message = error.response.data?.message;
                // Redirect to login if token is expired or unauthorized
                if (message === "Token telah kedaluwarsa." || message === "Unauthenticated." || error.response.data?.statusCode === 401) {
                    if (typeof window !== "undefined") {
                        localStorage.removeItem("token");
                        // Use window.location.href for a hard redirect to clear state if needed
                        window.location.href = "/login";
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

