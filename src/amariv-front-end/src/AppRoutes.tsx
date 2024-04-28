import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";
import { LogoutPage } from "./pages/Logout";
import { isDesktop } from "react-device-detect";
import { StartPage } from "./pages/Start";
import { LoginPage } from "./pages/Login";
import Login from "./pages/Loginv2/Login";

/**
 * AuthAppRoutes
 */
export const AuthAppRoutes = () => {
  const appContext = React.useContext(AppContext);
  return (
    !AuthUtils.isAuth(appContext)
      ? <Navigate to="/" replace={true} />
      : <Routes>
        <Route path="/home" element={<div>Home</div>} />
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
      <Route path="/" element={!isDesktop ? <StartPage /> : <Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<AuthAppRoutes />} />
    </Routes>
  );
};