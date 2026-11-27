import axiosInstance from "../../../config/axiosInstance";

export const registerAPI = async (data) => {
  return await axiosInstance.post("/auth/register", data);
};


export const loginAPI = async (data) => {
  console.log(data)
  return await axiosInstance.post("/auth/login" , data)
}