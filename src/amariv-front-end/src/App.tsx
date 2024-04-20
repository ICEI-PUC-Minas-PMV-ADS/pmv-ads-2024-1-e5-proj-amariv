import { AppContextProvider } from './AppContext';
import { AppRoutes } from './AppRoutes';
import './App.css';

/**
 * Application component.
 */

export function App() {
  return (
    <AppContextProvider>
      <AppImpl />
    </AppContextProvider>
  );
};

/**
 * Application component implementation.
 */

function AppImpl() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}