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
  return (
    <div className="w-screen min-h-screen flex flex-row bg-[#F4FAF6]">
      <Sidebar />
      <AppRoutes />
    </div>
  );
}