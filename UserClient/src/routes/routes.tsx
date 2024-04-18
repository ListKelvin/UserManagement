/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import Loadable from "./Loadable";
import AuthGuard from "./AuthGuard";

const ErrorNotLink = Loadable({ loader: () => import("../pages/error/Error") });

const Unauthorized = Loadable({
  loader: () => import("../pages/error/Unauthorized"),
});
const Admin = Loadable({
  loader: () => import("../pages/admin/Admin"),
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        path: "/admin",
        element: Admin,
      },

      {
        path: "/404",
        element: ErrorNotLink,
      },
    ],
  },

  {
    path: "403",
    element: Unauthorized,
  },

  {
    path: "/*",
    element: ErrorNotLink,
  },
]);
