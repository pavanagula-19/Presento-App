import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import "./App.css";
import { RootState } from "./redux/store";
import { PATH, PrivateRoutes, PublicRoutes } from "./routes";
import { Toaster } from "sonner";
import Error from "./Error";
import { useState, useEffect } from "react";

const AppRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.user.token);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <Error />;
  }

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
