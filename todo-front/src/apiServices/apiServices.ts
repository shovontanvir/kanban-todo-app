import axios from "axios";

// centralized and configured Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to automatically add the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    
    const publicRoutes = ["/login", "/register"];

    if (token && typeof config.url === "string" && !publicRoutes.includes(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// generic API methods
export const getApiData = async (url: string, config = {}) => {
  const { data } = await apiClient.get(url, config);
  return data;
};

export const postApiData = async (url: string, body: any, config = {}) => {
  const { data } = await apiClient.post(url, body, config);
  return data;
};

export const putApiData = async (url: string, body: any, config = {}) => {
  const { data } = await apiClient.put(url, body, config);
  return data;
};

export const deleteApiData = async (url: string, config = {}) => {
  const { data } = await apiClient.delete(url, config);
  return data;
};
