import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { PasswordRecoveryPage } from "./pages/password-recovery";
import { ColetaPage } from "./pages/coleta";
import MaterialPage from "./pages/materiais/MaterialPage";
import FuncionariosPage from "./pages/funcionarios/FuncionariosPage"
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";
import Sidebar from "./components/Sidebar";

interface AuthAppRoutesProps {
  children: React.ReactNode;
}

/**
 * AuthAppRoutes
 */
export const AuthAppRoutes: React.FC<AuthAppRoutesProps> = ({ children }) => {
  const appContext = React.useContext(AppContext);
  return !AuthUtils.isAuth(appContext) ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Routes>
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/coleta" element={<ColetaPage />} />
      <Route path="/materiais" element={<MaterialPage />} />
      <Route path="/Funcionarios" element={<FuncionariosPage />} />
      <Route path="/*" element={<React.Fragment>{children}</React.Fragment>} />
    </Routes>
  );
};

/**
 * AppRoutes
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Start Page</div>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<PasswordRecoveryPage />} />
      <Route
        path="/*"
        element={
          <AuthAppRoutes>
            <Sidebar /> 
          </AuthAppRoutes>
        }
      />
    </Routes>
  );
}