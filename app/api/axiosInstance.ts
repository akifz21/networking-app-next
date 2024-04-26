import axios, { AxiosError } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401 && error.response.data === "Token Expired") {
      localStorage.removeItem("token");
      window.location.href = "/login";
      console.log("Token Expired");
    }
    const errorResponse = error.response?.data;

    return Promise.reject(errorResponse || error);
  }
);

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

const defaultFetcher = (url: string) => axios.get(url).then((res) => res.data);

export { instance, fetcher, defaultFetcher };
