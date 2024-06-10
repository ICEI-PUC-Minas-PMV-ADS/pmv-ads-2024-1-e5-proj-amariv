import React from "react";
import { HistoryGatheringList } from "./HistoryGatheringList";
import { Gathering } from "src/models/Gathering";
import { useNotification } from "src/components/NotificationProvider";

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
  const notification = useNotification();

  /**
   * Effect
   */

  React.useEffect(() => {
    (async () => {
      try {
        setGatheringItems(historyGatherings.filter((i) =>
          i.status === true && i.delete === false && (i.isSuccess === true || i.cancelada === true)));
      } catch (e: any) {
        notification(e);
      }
    })();
  }, [historyGatherings, notification]);

  /**
   * Layout
   */

  return (
    <div>
      <HistoryGatheringList gatherings={gatheringItems} />
    </div>
  );
}