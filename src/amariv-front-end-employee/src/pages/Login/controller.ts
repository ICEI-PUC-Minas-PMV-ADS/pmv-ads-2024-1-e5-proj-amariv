import { AppContextState } from "../../AppContext";
import { PageBaseController } from "../../framework/controller";
import { UserService } from "../../services/UserService";
import { AuthUtils } from "../../utils/AuthUtils";

/**
 * Login state
 */
export type LoginState = {
  email: string,
  password: string,
};

/**
 * Login initial state.
 */
export const initialLoginState: LoginState = {
  email: '',
  password: '',
};

/**
 * Login action
 */
export type LoginAction = {
  type: 'set_email',
  email: string,
} | {
  type: 'set_password',
  password: string,
};

/**
 * Login controller
 */

export class LoginController extends PageBaseController<LoginState, LoginAction> {
  setEmail(value: string) {
    this.dispatch({ type: 'set_email', email: value });
  }

  setPassword(value: string) {
    this.dispatch({ type: 'set_password', password: value });
  }

  async submit(appContext: AppContextState, { email, password }: LoginState): Promise<void> {
    try {
      const response = await UserService.signIn({ email, password });
      AuthUtils.login(appContext, response.token);
    } catch (e) {
      throw e;
    }
  }

  doReducer(prevState: LoginState, action: LoginAction): LoginState {
    switch (action.type) {
      case 'set_email':
        return { ...prevState, email: action.email };

      case 'set_password':
        return { ...prevState, password: action.password };
    }
  }
}