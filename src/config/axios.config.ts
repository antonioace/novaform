import axios from "axios";
import supabase from "./supabase.config";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_BACKEND_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
      //  config.headers.Authorization = "xxx"
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await supabase.auth.signOut();
      // window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
