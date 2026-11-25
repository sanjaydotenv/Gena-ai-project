import axiosInstance from "../config/axiosInstance";

export const registerAPI = async (data) => {
  console.log(data);
  return await axiosInstance.post("/auth/register", data);
};
