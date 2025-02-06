import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import { RootState } from "./redux/store";
import { Toaster } from "sonner";
import { PrivateRoutes } from "./routes/private-route";
import { PATH } from "./routes/path-constants";
import { PublicRoutes } from "./routes/public-route";

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
