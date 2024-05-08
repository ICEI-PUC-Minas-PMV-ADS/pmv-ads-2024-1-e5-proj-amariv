import React from "react";
import { AuthUtils } from "./utils/AuthUtils";
import { GatheringItinerary } from "./models/GatheringItinerary";

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
  state: { gatheringItinerary: null },
  dispatch: () => { },
});

/**
 * AppState
 */
export type AppState = {
  token?: string,
  startPosition?: { lat: number, lon: number },
  gatheringItinerary: GatheringItinerary | null,
};

/**
 * AppAction
 */
export type AppAction = {
  type: 'login' | 'logout' | 'set_gathering_itinerary',
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
      return { ...state, gatheringItinerary: action.payload };
    case 'logout':
      return { ...state, token: undefined };
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
  >(AppReducer, { token: localUserData, gatheringItinerary: null });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};