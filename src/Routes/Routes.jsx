import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Home/Login/Login";
import Register from "../Pages/Home/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import UserInfo from "../Pages/Dashboard/UserInfo";
import UpdateUserInfo from "../Pages/Dashboard/UpdateUserInfo";
import AddAClass from "../Pages/Dashboard/AddClass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "userInfo",
        element: <UserInfo />,
      },
      {
        path: "updateUserInfo/:id",
        element: <UpdateUserInfo />,
        loader:({params})=>fetch(`http://localhost:5000/getSingleUser/${params.id}`)
      },
      {
        path:"addclass",
        element:<AddAClass/>
      }
    ],
  },
]);

export default router;
