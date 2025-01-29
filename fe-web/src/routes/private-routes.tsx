import DashboardPage from "@/components/dashboard";
import CreateNotes from "@/pages/CreateNotes";
import { RouteObject } from "react-router-dom";
import { PrivateLayout } from "../layouts";
import { PATH } from "./path-constants";
import ViewNotes from "@/pages/ViewNotes";
import SharedNotes from "@/pages/SharedNotes";
import CreateBook from "@/pages/CreateBook";
import ManageBook from "@/pages/ManageBook";
import PublishBook from "@/pages/PublishBook";
import LibraryBooksSearch from "@/pages/LibraryBooksSearch";
import { ManageProjects } from "@/components/projects/ManageProjects";
import  CreatePlanning  from "@/components/projects/CreatePlanning";
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
  {
    index: true,
    element: (
      <PrivateLayout>
        <SharedNotes />
      </PrivateLayout>
    ),
    path: PATH.SHAREDNOTES,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <CreateBook />
      </PrivateLayout>
    ),
    path: PATH.CREATEBOOK,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <ManageBook />
      </PrivateLayout>
    ),
    path: PATH.MANAGEBOOK,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <PublishBook />
      </PrivateLayout>
    ),
    path: PATH.PUBLISHBOOK,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <LibraryBooksSearch />
      </PrivateLayout>
    ),
    path: PATH.SEARCHBOOKS,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <ManageProjects />
      </PrivateLayout>
    ),
    path: PATH.MANAGEPROJECTS,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <CreatePlanning />
      </PrivateLayout>
    ),
    path: PATH.CREATEPLANNING,
  },
];
