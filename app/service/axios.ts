import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.nyp.id",
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;

