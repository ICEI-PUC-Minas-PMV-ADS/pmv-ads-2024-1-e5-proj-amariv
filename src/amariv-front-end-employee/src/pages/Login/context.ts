import { createPageContext } from "../../framework/context";
import { LoginAction, LoginController, LoginState, initialLoginState } from "./controller";

/**
 * Login context.
 */

export const LoginContext = createPageContext<
  LoginState,
  LoginAction,
  LoginController
>({
  controllerClass: LoginController,
  initialState: initialLoginState,
});