import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const {user} = useContext(AuthContext) || null;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute