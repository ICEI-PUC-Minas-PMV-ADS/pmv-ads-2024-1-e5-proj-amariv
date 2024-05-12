import React from 'react';
import { AppContext, AppContextProvider } from './AppContext';
import { AppRoutes } from './AppRoutes';
import { NotificationProvider } from './components/NotificationProvider';
import { GatheringItineraryService } from './services/GatheringItineraryService';
import './App.css';

/**
 * Application component.
 */

export function App() {
  return (
    <NotificationProvider>
      <AppContextProvider>
        <AppImpl />
      </AppContextProvider>
    </NotificationProvider>
  );
};

/**
 * Application component implementation.
 */

function AppImpl() {
  const { state: { token }, dispatch } = React.useContext(AppContext);

  /**
   * Effects.
   */

  React.useEffect(() => {
    (async function () {
      try {
        if (token) {
          const gatheringItinerary = await GatheringItineraryService
            .getGatheringItinerary(token);
          dispatch({ type: 'set_gathering_itinerary', payload: gatheringItinerary });
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [token, dispatch]);

  /**
   * Layout
   */

  return (
    <div className="w-full h-full">
      <AppRoutes />
    </div>
  );
}