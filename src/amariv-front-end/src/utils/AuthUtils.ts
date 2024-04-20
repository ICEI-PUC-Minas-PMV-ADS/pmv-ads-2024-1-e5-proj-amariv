import { AppContextState } from "../AppContext";
import { User } from "../models/User";

/**
 * Local constants
 */
const USER_KEY = 'auth_user_key';

/**
 * AuthUtils
 */
export class AuthUtils {
  static isAuth(appContext: AppContextState) {
    return appContext.state.user !== undefined;
  }

  static hasLocalUserData(): boolean {
    return window.localStorage.getItem(USER_KEY) !== null;
  }

  static getLocalUserData(): User {
    const localUserData = window.localStorage.getItem(USER_KEY);
    if (localUserData === null) {
      throw new Error('Invalid local user data!');
    }
    return JSON.parse(localUserData);
  }

  static login(appContext: AppContextState, user: User) {
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    appContext.dispatch({ type: 'login', payload: user });
  }

  static logout(appContext: AppContextState) {
    window.localStorage.removeItem(USER_KEY);
    appContext.dispatch({ type: 'logout' });
  }
}