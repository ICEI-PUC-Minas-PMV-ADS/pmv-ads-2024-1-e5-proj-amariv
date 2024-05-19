import { createPageContext } from "../../framework/context";
import { RoutesAction, RoutesController, RoutesState, initialRoutesState } from "./controller";

/**
 * Routes context.
 */

export const RoutesContext = createPageContext<
  RoutesState,
  RoutesAction,
  RoutesController
>({
  controllerClass: RoutesController,
  initialState: initialRoutesState,
});