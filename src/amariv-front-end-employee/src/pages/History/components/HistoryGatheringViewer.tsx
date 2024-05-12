import React from "react";
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
  const [gatheringItems, setGatheringItems] = React.useState<Gathering[]>([]);

  /**
   * Effect
   */

  React.useEffect(() => {
    (async () => {
      try {
        setGatheringItems(historyGatherings.filter((i) => i.status === false));
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