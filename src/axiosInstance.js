import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
})


api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error.config;

        // incase of token got expired
        if (error.response?.status == 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try {
                const {data} = await axios.post("http://localhost:8000/account/refresh/", {}, {withCredentials: true});

                const newAccessToken = data.access_token;

                localStorage.setItem("token", newAccessToken);

                // retrying the failed request
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest)
                
            } catch (refreshError) {
                console.log("Refresh token failed due to: ", refreshError)
                
            }
        }

        return Promise.reject(error)
    }
);

export default api;

