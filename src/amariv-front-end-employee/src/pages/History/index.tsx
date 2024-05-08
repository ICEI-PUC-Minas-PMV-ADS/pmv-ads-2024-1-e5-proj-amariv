import { isDesktop } from "react-device-detect";
import { PageComponent } from "../../framework/component";
import { HistoryContext } from "./context";
import { HistoryDesktopPage } from "./index_desktop";
import { HistoryMobilePage } from "./index_mobile";
import React from "react";

/**
 * History page
 */

export const HistoryPage = PageComponent(() => {
  const ctrl = HistoryContext.usePageController();

  /**
   * Effects
   */

  React.useEffect(() => {
    try {
      ctrl.getHistoryGatherings();
    } catch (e) {
      console.log(e);
    }
  }, [ctrl]);

  /**
   * Layout
   */

  return (
    <>{isDesktop ? <HistoryDesktopPage /> : <HistoryMobilePage />}</>
  );
}, HistoryContext.Provider);