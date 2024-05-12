import { isDesktop } from "react-device-detect";
import { PageComponent } from "../../framework/component";
import { HistoryContext } from "./context";
import { HistoryDesktopPage } from "./index_desktop";
import { HistoryMobilePage } from "./index_mobile";

/**
 * History page
 */

export const HistoryPage = PageComponent(() => {
  /**
   * Layout
   */

  return (
    <>{isDesktop ? <HistoryDesktopPage /> : <HistoryMobilePage />}</>
  );
}, HistoryContext.Provider);