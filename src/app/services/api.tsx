import axios from "axios";

let baseURL = process.env.API_URL || "http://localhost:3002/";

const Api = axios.create({
    baseURL: baseURL,
});

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

Api.interceptors.response.use(
    (res) => {
        return res;
    },
    function (err) {
        const status = err?.response?.status;
        if (status === 422) {
            const messages = err?.response?.data;
            console.log("messages", messages);
        }
        return Promise.reject(err);
    }
);

export default Api;