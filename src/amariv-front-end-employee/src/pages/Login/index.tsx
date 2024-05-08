import { isDesktop } from "react-device-detect";
import { PageComponent } from "../../framework/component";
import { LoginContext } from "./context";
import { LoginMobilePage } from "./index_mobile";
import { LoginDesktopPage } from "./index_desktop";

/**
 * Login page.
 */

export const LoginPage = PageComponent(() => {
  return <>{isDesktop ? <LoginDesktopPage /> : <LoginMobilePage />}</>;
}, LoginContext.Provider);