import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/register";
import { LoginPage } from "./pages/login";
import { PasswordRecoveryPage } from "./pages/password-recovery";
import { ColetaPage } from "./pages/coleta";
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";

/**
 * AuthAppRoutes
 */
export const AuthAppRoutes = () => {
  const appContext = React.useContext(AppContext);
  return !AuthUtils.isAuth(appContext) ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Routes>
      <Route path="/home" element={<div>Home</div>} />
    </Routes>
  );
};

/**
 * AppRoutes
 */
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Start Page</div>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<PasswordRecoveryPage />} />
      <Route path="/coleta" element={<ColetaPage />} />
      <Route path="/*" element={<AuthAppRoutes />} />
    </Routes>
  );
};
