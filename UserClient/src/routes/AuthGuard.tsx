import { Navigate, Outlet } from "react-router-dom";
// this AuthGuard is for protected routes
const AuthGuard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
