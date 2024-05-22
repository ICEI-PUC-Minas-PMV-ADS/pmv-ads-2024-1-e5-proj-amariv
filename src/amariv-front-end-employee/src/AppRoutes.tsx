import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";
import { LogoutPage } from "./pages/Logout";
import { LoginPage } from './pages/Login';
import { HomePage } from "./pages/Home";
import { RoutesPage } from "./pages/Routes";
import { HistoryPage } from "./pages/History";

/**
 * AuthAppRoutes
 */
export const AuthAppRoutes = () => {
  const appContext = React.useContext(AppContext);
  return (
    !AuthUtils.isAuth(appContext)
      ? <Navigate to="/login" replace={true} />
      : <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/*" element={<div>Erro 404</div>} />
      </Routes>
  );
};

/**
 * AppRoutes
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AuthAppRoutes />} />
    </Routes>
  );
};