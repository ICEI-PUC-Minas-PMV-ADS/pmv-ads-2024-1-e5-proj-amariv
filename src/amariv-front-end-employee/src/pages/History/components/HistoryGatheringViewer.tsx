import React from "react";
import { HistoryGatheringList } from "./HistoryGatheringList";
import { HistoryGathering } from "src/models/HistoryGathering";

/**
 * HistoryGatheringViewerProps
 */

export type HistoryGatheringViewerProps = {
  historyGatherings: HistoryGathering[],
};

/**
 * HistoryGatheringViewer
 */

export function HistoryGatheringViewer({ historyGatherings }: HistoryGatheringViewerProps) {
  const [gatheringItems, setGatheringItems] = React.useState<HistoryGathering[]>([]);

  /**
   * Effect
   */

  React.useEffect(() => {
    (async () => {
      try {
        setGatheringItems(historyGatherings);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [historyGatherings]);

  /**
   * Layout
   */

  return (
    <div>
      <HistoryGatheringList gatherings={gatheringItems} />
    </div>
  );
}