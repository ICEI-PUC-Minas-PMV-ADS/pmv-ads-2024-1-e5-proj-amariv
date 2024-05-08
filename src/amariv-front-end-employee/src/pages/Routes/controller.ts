import { PageBaseController } from "../../framework/controller";

/**
 * Routes state.
 */

export type RoutesState = {};

/**
 * Routes initial state.
 */

export const initialRoutesState: RoutesState = {};

/**
 * Routes action.
 */

export type RoutesAction = {};

/**
 * Routes controller.
 */

export class RoutesController extends PageBaseController<RoutesState, RoutesAction> {
  doReducer(prevState: RoutesState, action: RoutesAction): RoutesState {
    return prevState;
  }
}