import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RegisterPage from "./features/auth/ui/pages/RegisterPage";
import LoginPage from "./features/auth/ui/pages/LoginPage";
import DashboardPage from "./features/chat/ui/pages/DashboardPage";
import axiosInstance from "./config/axiosInstance";
import { useDispatch } from "react-redux";
import { setAccessToken, setUserData } from "./features/auth/slice/authSlice";
import ChatPage from "./features/chat/ui/pages/ChatPage";

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
     {
      path: "/chat",
      element: <ChatPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
