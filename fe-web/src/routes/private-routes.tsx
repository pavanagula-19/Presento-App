import DashboardPage from "@/components/Dashboard";
import CreateNotes from "@/pages/CreateNotes"
import { RouteObject } from "react-router-dom";
import { PrivateLayout } from "../layouts";
import { PATH } from "./path-constants";
import ViewNotes from "@/pages/ViewNotes";

export const PrivateRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <PrivateLayout>
        <DashboardPage />
      </PrivateLayout>
    ),
    path: PATH.DASHBOARD,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <CreateNotes />
      </PrivateLayout>
    ),
    path: PATH.CREATENOTES,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <ViewNotes />
      </PrivateLayout>
    ),
    path: PATH.VIEWNOTES,
  },
];
