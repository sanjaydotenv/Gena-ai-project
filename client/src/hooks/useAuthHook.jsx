import { useState } from "react";
import { loginAPI, registerAPI } from "../api/authAPI";
import { useDispatch } from "react-redux";
import { handleLoading, setAccessToken, setUserData } from "../slice/authSlice";

export const useAuthHook = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleRegisterData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    dispatch(handleLoading(true));
    const response = await registerAPI(formData);
    console.log(response);
    dispatch(setUserData(response.data.user));
    dispatch(handleLoading(false));

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleLoginData = async (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormDataLogin({ ...formDataLogin, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    dispatch(handleLoading(true));
    const response = await loginAPI(formDataLogin);
    dispatch(handleLoading(false));
    dispatch(setAccessToken(response.data.data.accessToken));
    dispatch(setUserData(response.data.data.user));

    setFormDataLogin({
      email: "",
      password: "",
    });
  };

  return {
    handleRegisterData,
    handleRegisterSubmit,
    formData,
    formDataLogin,
    handleLoginData,
    handleLoginSubmit,
  };
};
