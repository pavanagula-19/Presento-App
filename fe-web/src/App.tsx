import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import { RootState } from "./redux/store";
import { PATH, PrivateRoutes, PublicRoutes } from "./routes";
import { Toaster } from "sonner";

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.token);
  const privateRouteAuthenticated = PrivateRoutes.map((route) => {
    return {
      ...route,
      element: isAuthenticated ? route.element : <Navigate to={PATH.LOGIN} />,
    };
  });
  const element = useRoutes([...privateRouteAuthenticated, ...PublicRoutes]);
  return element;
};

function App() {
  return (
    <BrowserRouter key="presento">
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;
