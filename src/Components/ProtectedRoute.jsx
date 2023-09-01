import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { userAuth } = useSelector((store) => store.auth);
  
  return userAuth ? <Outlet /> : <Navigate to={"/Login"} />;
};

export default ProtectedRoute;
