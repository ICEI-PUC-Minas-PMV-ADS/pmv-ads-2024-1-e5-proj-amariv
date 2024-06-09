import Sidebar from './components/Sidebar';
import { AppContextProvider } from './AppContext';
import { AppRoutes } from './AppRoutes';
import { useLocation } from 'react-router-dom';
import './App.css';

export function App() {
  return (
    <AppContextProvider>
      <AppImpl />
    </AppContextProvider>
  );
};

function AppImpl() {
  const location = useLocation();

  // Verifica se a rota atual é diferente de '/login' e '/register' para exibir a Sidebar
  const shouldDisplaySidebar = location.pathname !== '/login' && location.pathname !== '/register';



  return (
    <div className="App">
      {shouldDisplaySidebar && <Sidebar />}
      <AppRoutes />
    </div>
  );
}