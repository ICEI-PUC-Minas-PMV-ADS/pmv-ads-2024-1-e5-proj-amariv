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
          const gatheringItineraries = await GatheringItineraryService
            .getGatheringItinerary(token);
          if (gatheringItineraries.length > 0) {
            dispatch({ type: 'set_gathering_itinerary', payload: gatheringItineraries[0] });
          } else {
            dispatch({ type: 'set_gathering_itinerary', payload: null });
          }
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