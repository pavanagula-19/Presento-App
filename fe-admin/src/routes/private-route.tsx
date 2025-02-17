import Settings from "@/components/settings";
import { PrivateLayout } from "@/layouts/private-layout";
import Customers from "@/pages/customer";
import DashboardPage from "@/pages/dashboard";
import Products from "@/pages/products";
import { RouteObject } from "react-router-dom";
import { PATH } from "./path-constants";

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
        <Customers />
      </PrivateLayout>
    ),
    path: PATH.CUSTOMERS,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <Products />
      </PrivateLayout>
    ),
    path: PATH.PRODUCTS,
  },
  {
    index: true,
    element: (
      <PrivateLayout>
        <Settings />
      </PrivateLayout>  
    ),
    path: PATH.SETTINGS,
  },
];
