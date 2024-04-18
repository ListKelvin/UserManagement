import { Outlet } from "react-router-dom";
// this AuthGuard is for protected routes
const AuthGuard = () => {
  return <Outlet />;
};

export default AuthGuard;
