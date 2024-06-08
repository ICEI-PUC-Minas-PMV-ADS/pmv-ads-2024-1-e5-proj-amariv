import React from "react";
import { AuthUtils } from "./utils/AuthUtils";
import { GatheringItinerary } from "./models/GatheringItinerary";
import { Gathering } from "./models/Gathering";

/**
 * AppContextState
 */
export type AppContextState = {
  state: AppState,
  dispatch: React.Dispatch<AppAction>,
};

/**
 * AppContext
 */
export const AppContext = React.createContext<AppContextState>({
  state: {
    gatheringItinerary: null,
    currentGathering: null,
    showLogoutConfirmation: false,
  },
  dispatch: () => { },
});

/**
 * AppState
 */
export type AppState = {
  token?: string,
  startPosition?: { lat: number, lon: number },
  gatheringItinerary: GatheringItinerary | null,
  currentGathering: Gathering | null,
  showLogoutConfirmation: boolean,
};

/**
 * AppAction
 */
export type AppAction = {
  type: 'login' | 'logout' | 'set_gathering_itinerary' | 'set_show_logout_confirmation',
  payload?: any,
};

/**
 * AppReducer
 */
const AppReducer = (
  state: AppState,
  action: AppAction,
): AppState => {
  switch (action.type) {
    case 'login':
      return { ...state, token: action.payload };
    case 'set_gathering_itinerary':
      if (action.payload === null) {
        return { ...state, gatheringItinerary: null, currentGathering: null };
      }
      const gatheringItinerary = action.payload as GatheringItinerary;
      const filteredGatherings = gatheringItinerary.coletas.filter((i) => i.status === false && i.delete === false);
      const sortedAndFilteredGatherings = filteredGatherings.sort((a, b) => a.posicaoLista - b.posicaoLista);
      return { ...state, gatheringItinerary, currentGathering: sortedAndFilteredGatherings[0] };
    case 'logout':
      return { ...state, token: undefined, showLogoutConfirmation: false };
    case 'set_show_logout_confirmation':
      return { ...state, showLogoutConfirmation: action.payload };
  }
};

/**
 * AppContextProvider
 */
export const AppContextProvider = (props: React.PropsWithChildren) => {
  let localUserData: string | undefined;

  if (AuthUtils.hasLocalUserData()) {
    localUserData = AuthUtils.getLocalUserData();
  }

  const [state, dispatch] = React.useReducer<
    React.Reducer<AppState, AppAction>
  >(AppReducer, {
    token: localUserData,
    gatheringItinerary: null,
    currentGathering: null,
    showLogoutConfirmation: false,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};