import React from "react";
import FuncionariosPage from "./pages/funcionarios/FuncionariosPage";
import MaterialPage from "./pages/materiais/MaterialPage";
import HistoricoColeta from './pages/historicocoleta/HistoricoColeta';

import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { ColetaPage } from "./pages/coleta";
import { AuthUtils } from "./utils/AuthUtils";
import { AppContext } from "./AppContext";
import { RoteiroDeColetaPage } from "./pages/Roteiro_de_coleta";
import { ListaDeColetasPendentesPage } from "./pages/Lista_de_coletas_pendentes";
import { Logout } from "./pages/Logout";

interface AuthAppRoutesProps {
  children: React.ReactNode;
}

export const AuthAppRoutes: React.FC<AuthAppRoutesProps> = ({ children }) => {
  const appContext = React.useContext(AppContext);
  return !AuthUtils.isAuth(appContext) ? (
    <Navigate to="/login" replace={true} />
  ) : (
    <Routes>
      <Route path="/" element={<ListaDeColetasPendentesPage />} />
      <Route path="/home" element={<ListaDeColetasPendentesPage />} />
      <Route path="/coleta" element={<ColetaPage />} />
      <Route path="/funcionarios" element={<FuncionariosPage />} />
      <Route path="/materiais" element={<MaterialPage />} />
      <Route path="/lista_de_coletas_pendentes" element={<ListaDeColetasPendentesPage />} />
      <Route path="/roteiro_de_coleta" element={<RoteiroDeColetaPage />} />
      <Route path="/historico-coleta" element={<HistoricoColeta title="Historico Coleta" />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/*" element={<React.Fragment>{children}</React.Fragment>} />
    </Routes>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<AuthAppRoutes children={undefined} />} />
    </Routes>
  );
};


