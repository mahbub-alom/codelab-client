import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location=useLocation()
  if(loading){
    return <span>Loading...</span>
  }
  if(user){
    return children
  }
  return <Navigate to='/login' state={{from:location}}></Navigate>;
};

export default PrivateRoute;
