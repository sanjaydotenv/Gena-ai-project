import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import axiosInstance from "./config/axiosInstance";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserData } from "./slice/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const hydrateUser = async () => {
    const token = await axiosInstance.post("/auth/token-rotation");

    dispatch(setAccessToken(token.data.accessToken));

    const response = await axiosInstance.get("/auth/get-me", {
      headers: {
        authorization: `Bearer ${token.data.accessToken}`,
      },
    });

    dispatch(setUserData(response.data.user));
  };
  useEffect(() => {
    hydrateUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
