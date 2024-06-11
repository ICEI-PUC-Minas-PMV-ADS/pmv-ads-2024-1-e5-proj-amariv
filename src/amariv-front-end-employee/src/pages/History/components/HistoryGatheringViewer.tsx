import { HistoryGatheringList } from "./HistoryGatheringList";
import { Gathering } from "src/models/Gathering";

/**
 * HistoryGatheringViewerProps
 */

export type HistoryGatheringViewerProps = {
  historyGatherings: Gathering[],
};

/**
 * HistoryGatheringViewer
 */

export function HistoryGatheringViewer({ historyGatherings }: HistoryGatheringViewerProps) {

  /**
   * Layout
   */

  return (
    <div>
      <HistoryGatheringList gatherings={historyGatherings} />
    </div>
  );
}