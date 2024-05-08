import { HistoryGatheringService } from "src/services/HistoryGatheringService";
import { PageBaseController } from "../../framework/controller";
import { HistoryGathering } from "src/models/HistoryGathering";

/**
 * History state.
 */

export type HistoryState = {
  historyGatherings: HistoryGathering[],
};

/**
 * History initial state.
 */

export const initialHistoryState = {
  historyGatherings: [],
};

/**
 * History action.
 */

export type HistoryAction = {
  type: 'set_history_gatherings',
  historyGatherings: HistoryGathering[],
};

/**
 * History controller.
 */

export class HistoryController extends PageBaseController<HistoryState, HistoryAction> {
  async getHistoryGatherings() {
    const historyGatherings = await HistoryGatheringService.getHistoryGatherings();
    this.dispatch({ type: 'set_history_gatherings', historyGatherings });
  }

  doReducer(prevState: HistoryState, action: HistoryAction): HistoryState {
    switch (action.type) {
      case 'set_history_gatherings':
        return { ...prevState, historyGatherings: action.historyGatherings };
    }
  }
}