import axios from "axios";
import { URLs } from "@/constants/urls";
import { cookies } from "next/headers";

const customAxios = axios.create({
  withCredentials: true,
}); // ❌ baseURL nahi set kar rahe

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-access-token")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(
          `${URLs.backend}/api/v1/auth/refresh-access-token`,
          {
            withCredentials: true,
          }
        );

        if (res.data?.accessToken) {
          const newToken = res.data?.accessToken;

          localStorage.setItem("accessToken", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return customAxios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token expired. Logging out.");
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
