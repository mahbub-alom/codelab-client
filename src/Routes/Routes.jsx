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
import MyClass from "../Pages/Dashboard/MyClass";
import AllClass from "../Pages/AllClass/AllClass";
import SelectedClass from "../Pages/Dashboard/SelectedClass";
import Payment from "../Pages/Payment/Payment";
import EnrolledClasses from "../Pages/Dashboard/EnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import UpdateClass from "../Pages/Dashboard/UpdateClass";
import PrivateRoute from "./PrivateRoute";
import Instructor from "../Pages/Home/Instructor/Instructor";

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
      {
        path: "/allClasses",
        element: <AllClass />,
      },
      {
        path: "/instructors",
        element: <Instructor />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "userInfo",
        element: <UserInfo />,
      },
      {
        path: "updateUserInfo/:id",
        element: <UpdateUserInfo />,
        loader: ({ params }) =>
          fetch(`https://codelab-server.onrender.com/getSingleUser/${params.id}`),
      },
      {
        path: "addclass",
        element: <AddAClass />,
      },
      {
        path: "myclass",
        element: <MyClass />,
      },
      {
        path: "selectedClass",
        element: <SelectedClass/>,
      },
      {
        path: "payment/:id",
        element: <Payment/>,
      },
      {
        path:"myenrollclasses",
        element:<EnrolledClasses/>
      },
      {
        path:"paymentHistory",
        element:<PaymentHistory/>
      },
      {
        path:"updateClass/:id",
        element:<UpdateClass/>,
        loader:({params})=>fetch(`https://codelab-server.onrender.com/getSingleClass/${params.id}`)
      }
    ],
  },
]);

export default router;
