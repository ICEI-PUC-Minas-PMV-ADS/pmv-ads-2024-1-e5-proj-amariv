import React from "react";
import { AuthUtils } from "./utils/AuthUtils";

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
  state: {},
  dispatch: () => {},
});

/**
 * AppState
 */
export type AppState = {
  token?: string,
};

/**
 * AppAction
 */
export type AppAction = {
  type: 'login' | 'logout',
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
    case 'login': {
      return { ...state, token: action.payload };
    }
    case 'logout': {
      return { ...state, token: undefined };
    }
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
  >(AppReducer, { token: localUserData });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
}

/**
 * useAppContext
 */
export const useAppContext = () => React.useContext(AppContext);