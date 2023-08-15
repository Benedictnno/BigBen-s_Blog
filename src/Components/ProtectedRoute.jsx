import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { useData, userAuth } = useSelector((store) => store.auth);
//   if (!useData || !userAuth) {
//     return navigate("/");
//   }
  return children;
};

export default ProtectedRoute;
