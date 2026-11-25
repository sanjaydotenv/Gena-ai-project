import { useState } from "react";
import { loginAPI, registerAPI } from "../api/authAPI";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const handleRegisterData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await registerAPI(formData);
    setLoading(false);

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

    setLoading(true);
    const response = await loginAPI(formDataLogin);
    setLoading(false);

    setFormDataLogin({
      email: "",
      password: "",
    });
  };

  return {
    loading,
    setLoading,
    handleRegisterData,
    handleRegisterSubmit,
    formData,
    formDataLogin,
    handleLoginData,
    handleLoginSubmit,
  };
};
