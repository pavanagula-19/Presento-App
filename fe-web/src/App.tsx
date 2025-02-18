import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { RootState } from "./redux/store";
import { PATH, PrivateRoutes, PublicRoutes } from "./routes";
import { Toaster } from "sonner";
import Error from "./Error";
import { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage";

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

  return (
    <Routes>
      <Route path={PATH.LANDINGPAGE} element={<LandingPage />} />
      {PrivateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={isAuthenticated ? route.element : <Navigate to={PATH.LOGIN} />}
        />
      ))}
      {PublicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </BrowserRouter>
  );
}

export default App;
