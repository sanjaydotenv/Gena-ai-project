import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import axiosInstance from "./config/axiosInstance";

const App = () => {
  // const hydrateUser = () => {
  //   axiosInstance.post("/auth/")
  // };
  // useEffect(() => {
  //   hydrateUser;
  // }, []);

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
