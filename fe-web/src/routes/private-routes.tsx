import DashboardPage from "@/components/dashboard";
import CreateNotes from "@/pages/CreateNotes";
import { RouteObject } from "react-router-dom";
import { PrivateLayout } from "../layouts";
import { PATH } from "./path-constants";
import ViewNotes from "@/pages/ViewNotes";
import SharedNotes from "@/pages/SharedNotes";
import LibraryBooksSearch from "@/pages/LibraryBooksSearch";
import { ManageProjects } from "@/components/projects/ManageProjects";
import CreatePlanning from "@/components/projects/CreatePlanning";
import BookReader from "@/components/BookReader";
import BooksWishList from "@/pages/BooksWishlist";
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
  {
    index: true,
    element: (
      <PrivateLayout>
        <BookReader />
      </PrivateLayout>
    ),
    path: PATH.BOOKREADER,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <BooksWishList />
      </PrivateLayout>
    ),
    path: PATH.BOOKWISHLIST,
  },
];
