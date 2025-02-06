import { RouteObject } from "react-router-dom";
import { PublicLayout } from "../layouts";
import { PATH } from "./path-constants";
import LoginForm from "@/pages/login";

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
];
