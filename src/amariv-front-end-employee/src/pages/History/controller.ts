import { PageBaseController } from "../../framework/controller";

/**
 * History state.
 */

export type HistoryState = {
};

/**
 * History initial state.
 */

export const initialHistoryState = {
};

/**
 * History action.
 */

export type HistoryAction = {
};

/**
 * History controller.
 */

export class HistoryController extends PageBaseController<HistoryState, HistoryAction> {
  doReducer(prevState: HistoryState, action: HistoryAction): HistoryState {
    return prevState;
  }
}