import { HistoryGathering } from "src/models/HistoryGathering";

/**
 * HistoryGatheringService
 */

export class HistoryGatheringService {
  static async getHistoryGatherings(): Promise<HistoryGathering[]> {
    return [
      new HistoryGathering(1),
      new HistoryGathering(2),
    ];
  }
}