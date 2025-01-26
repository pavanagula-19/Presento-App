import { LoginForm } from "@/pages/Login";
import { RouteObject } from "react-router-dom";
import { PublicLayout } from "../layouts";
import { PATH } from "./path-constants";
import { RegisterForm } from "@/pages/Register";

export const PublicRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <PublicLayout>
        <LoginForm />
      </PublicLayout>
    ),
    path: PATH.LOGIN,
  },
  {
    index: true,
    element: (
      <PublicLayout>
        <RegisterForm />
      </PublicLayout>
    ),
    path: PATH.REGISTRATION,
  },
];
