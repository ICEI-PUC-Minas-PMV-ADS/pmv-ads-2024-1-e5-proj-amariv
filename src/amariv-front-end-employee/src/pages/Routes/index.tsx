import React from "react";
import { isDesktop } from "react-device-detect";
import { PageComponent } from "../../framework/component";
import { RoutesContext } from "./context";
import { RoutesDesktopPage } from "./index_desktop";
import { RoutesMobilePage } from "./index_mobile";

/**
 * Routes page
 */

export const RoutesPage = PageComponent(() => {

  /**
   * Layout
   */

  return (
    <>{isDesktop ? <RoutesDesktopPage /> : <RoutesMobilePage />}</>
  );
}, RoutesContext.Provider);