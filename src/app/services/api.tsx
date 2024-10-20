import axios from "axios";

let baseURL = process.env.NEXT_PUBLIC_BACKEND_API;

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