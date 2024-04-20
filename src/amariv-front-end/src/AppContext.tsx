import React from "react";
import { User } from "./models/User";
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
  user?: User,
};

/**
 * AppAction
 */
export type AppAction = {
  type: 'login' | 'logout',
  payload?: User,
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
      return { ...state, user: action.payload };
    }
    case 'logout': {
      return { ...state, user: undefined };
    }
  }
};

/**
 * AppContextProvider
 */
export const AppContextProvider = (props: React.PropsWithChildren) => {
  let localUserData: User | undefined;
  if (AuthUtils.hasLocalUserData()) {
    localUserData = AuthUtils.getLocalUserData();
  }

  const [state, dispatch] = React.useReducer<
    React.Reducer<AppState, AppAction>
  >(AppReducer, { user: localUserData });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};