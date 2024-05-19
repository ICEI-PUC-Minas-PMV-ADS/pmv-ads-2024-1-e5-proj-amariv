import React from "react";
import { isDesktop } from "react-device-detect";
import { PageComponent } from "../../framework/component";
import { HomeContext } from "./context";
import { HomeDesktopPage } from "./index_desktop";
import { HomeMobilePage } from "./index_mobile";
import { AppContext } from "src/AppContext";
import { Loading } from "./components/Loading";
import { useNotification } from "src/components/NotificationProvider";

/**
 * Home page
 */

export const HomePage = PageComponent(() => {
  const [loading, setLoading] = React.useState(true);
  const { token } = React.useContext(AppContext).state;
  const ctrl = HomeContext.usePageController();
  const notification = useNotification();

  /**
   * Effects
   */

  React.useEffect(() => {
    (async function () {
      try {
        if (token) {
          await ctrl.getUserInfo(token);
          await ctrl.getStartPosition(token);
          setLoading(false);
        }
      } catch (e: any) {
        notification(e);
      }
    })();
  }, [ctrl, token, notification]);

  /**
   * Layout
   */

  return (
    <Loading isLoading={loading}>
      {isDesktop ? <HomeDesktopPage /> : <HomeMobilePage />}
    </Loading>
  );
}, HomeContext.Provider);