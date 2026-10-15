import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// export const API_URL = "http://172.20.10.2:8000";
export const API_URL = "https://amazon-mobile-app-smy6.onrender.com";
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// ─── Attach token automatically ───
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Handle 401 globally — force logout ───
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
    }

    // Normalize error messages so Alert.alert shows something useful
    if (error.code === "ECONNABORTED") {
      error.message = "Request timed out. Check your network.";
    } else if (!error.response) {
      error.message = "Cannot reach server. Check Wi-Fi / backend.";
    } else if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }

    return Promise.reject(error);
  },
);

export default api;
