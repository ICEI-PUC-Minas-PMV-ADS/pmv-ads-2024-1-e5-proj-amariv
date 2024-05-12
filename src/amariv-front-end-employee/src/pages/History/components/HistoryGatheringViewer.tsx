import React from "react";
import { HistoryGatheringList } from "./HistoryGatheringList";
import { GatheringItem } from "src/models/GatheringItinerary";

/**
 * HistoryGatheringViewerProps
 */

export type HistoryGatheringViewerProps = {
  historyGatherings: GatheringItem[],
};

/**
 * HistoryGatheringViewer
 */

export function HistoryGatheringViewer({ historyGatherings }: HistoryGatheringViewerProps) {
  const [gatheringItems, setGatheringItems] = React.useState<GatheringItem[]>([]);

  /**
   * Effect
   */

  React.useEffect(() => {
    (async () => {
      try {
        setGatheringItems(historyGatherings.filter((i) => i.isActive === false));
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