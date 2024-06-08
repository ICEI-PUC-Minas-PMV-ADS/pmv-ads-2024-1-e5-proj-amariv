import React from 'react';
import { isDesktop } from 'react-device-detect';
import { AppContext, AppContextProvider } from './AppContext';
import { AppRoutes } from './AppRoutes';
import { NotificationProvider, useNotification } from './components/NotificationProvider';
import { GatheringItineraryService } from './services/GatheringItineraryService';
import { Button } from './components/Button';
import { Spacer } from './components/Spacer';
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
  const { state: { token, showLogoutConfirmation }, dispatch } = React.useContext(AppContext);
  const notification = useNotification();

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
      } catch (e: any) {
        notification(e);
      }
    })();
  }, [token, dispatch, notification]);

  /**
   * Layout
   */

  return (
    <>
      {/*
        * Confirm modal
        */}

      {showLogoutConfirmation === true && <>
        <div className="w-full h-full bg-[#000000A0] absolute z-10" >
          <div
            className="w-[80%] relative bg-white p-4 rounded left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2"
            style={{ width: isDesktop ? '20rem' : '80%' }}>
            <h2 className="text-center"><strong>Você deseja sair do aplicativo?</strong></h2>
            <Spacer height='1rem' />
            <div className="flex flex-row">
              <Button label="Sim" onClick={() => dispatch({ type: 'logout' })} />
              <div className='h-[1px] w-[2px]'></div>
              <Button label="Não" onClick={() => dispatch({ type: 'set_show_logout_confirmation', payload: false })} />
            </div>
          </div>
        </div>
      </>}

      {/*
        * Page
        */}

      <div className="w-full h-full">
        <AppRoutes />
      </div>
    </>
  );
}