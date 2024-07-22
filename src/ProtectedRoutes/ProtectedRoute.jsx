import React from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  try {
    const decoded = jwtDecode(token);
    if (token) {
      return children;
    }
  } catch (error) {
    localStorage.clear();
    return <Navigate to={"/signin"} />;
  }
}
