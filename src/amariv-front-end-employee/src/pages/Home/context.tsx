import { createPageContext } from "../../framework/context";
import { HomeAction, HomeController, HomeState, initialHomeState } from "./controller";

/**
 * Home context.
 */

export const HomeContext = createPageContext<
  HomeState,
  HomeAction,
  HomeController
>({
  controllerClass: HomeController,
  initialState: initialHomeState,
});