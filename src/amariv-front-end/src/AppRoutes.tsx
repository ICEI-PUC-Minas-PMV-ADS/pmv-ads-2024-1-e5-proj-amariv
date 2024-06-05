import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { PasswordRecoveryPage } from "./pages/password-recovery";
import { ColetaPage } from "./pages/coleta";
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";
import MaterialPage from "./pages/materiais/Material";
import HistoricoColeta from './pages/historicocoleta/HistoricoColeta';
interface AuthAppRoutesProps {
  children: React.ReactNode;
}


export const AuthAppRoutes: React.FC<AuthAppRoutesProps> = ({ children }) => {
  const appContext = React.useContext(AppContext);
  return !AuthUtils.isAuth(appContext) ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Routes>
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/coleta" element={<ColetaPage />} />
      <Route path="/materiais" element={<MaterialPage />} />
      <Route path="/*" element={<React.Fragment>{children}</React.Fragment>} />
    </Routes>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Start Page</div>} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recovery" element={<PasswordRecoveryPage />} />
      <Route path="/coleta" element={<ColetaPage />} />
      <Route path="/materiais" element={<MaterialPage />} />
      <Route path="/historico-coleta" element={<HistoricoColeta title="Historico Coleta" />} />
      <Route path="/*" element={<AuthAppRoutes children={undefined} />} />
  
    </Routes>
  );
};
