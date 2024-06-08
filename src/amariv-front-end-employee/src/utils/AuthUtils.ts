import { TOKEN_KEY } from "../AppConstants";
import { AppContextState } from "../AppContext";

/**
 * AuthUtils
 */
export class AuthUtils {
  static isAuth(appContext: AppContextState) {
    return appContext.state.token !== undefined;
  }

  static hasLocalUserData(): boolean {
    return window.localStorage.getItem(TOKEN_KEY) !== null;
  }

  static getLocalUserData(): string {
    const localUserData = window.localStorage.getItem(TOKEN_KEY);
    if (localUserData === null) {
      throw new Error('Invalid local user data!');
    }
    return localUserData;
  }

  static login(appContext: AppContextState, token: string) {
    window.localStorage.setItem(TOKEN_KEY, token);
    appContext.dispatch({ type: 'login', payload: token });
  }

  static logout(appContext: AppContextState) {
    window.localStorage.removeItem(TOKEN_KEY);
    appContext.dispatch({ type: 'logout' });
  }
}