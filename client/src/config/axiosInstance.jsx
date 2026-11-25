import axios from "axios";

const axiosInstance = new axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosInstance;
