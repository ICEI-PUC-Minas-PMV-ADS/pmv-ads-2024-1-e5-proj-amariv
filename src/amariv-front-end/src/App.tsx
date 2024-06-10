import Sidebar from './components/Sidebar';
import { AppContext, AppContextProvider } from './AppContext';
import { AppRoutes } from './AppRoutes';
import { useLocation } from 'react-router-dom';
import './App.css';
import React from 'react';
import { AuthUtils } from './utils/AuthUtils';

export function App() {
  return (
    <AppContextProvider>
      <AppImpl />
    </AppContextProvider>
  );
};

function AppImpl() {
  const location = useLocation();
  const { state, dispatch } = React.useContext(AppContext);

  React.useLayoutEffect(() => {
    if (AuthUtils.hasLocalUserData()) {
      AuthUtils.login({ state, dispatch }, AuthUtils.getLocalUserData())
    }
  }, []);

  // Verifica se a rota atual é diferente de '/login' e '/register' para exibir a Sidebar
  const shouldDisplaySidebar = location.pathname === '/login';

  return (
    <div className="w-screen min-h-screen flex flex-row bg-[#F4FAF6]">
      {shouldDisplaySidebar === false && <Sidebar />}
      <AppRoutes />
    </div>
  );
}