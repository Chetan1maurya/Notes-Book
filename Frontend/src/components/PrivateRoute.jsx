import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // 🔐 If not logged in → redirect to home (Welcome page)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If logged in → allow access
  return children;
};

export default PrivateRoute;