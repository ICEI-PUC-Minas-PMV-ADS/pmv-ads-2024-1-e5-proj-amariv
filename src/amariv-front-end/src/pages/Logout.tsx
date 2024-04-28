import React from "react";
import { AuthUtils } from "../utils/AuthUtils";
import { AppContext } from "../AppContext";

/**
 * Logout route.
 */
export function LogoutPage() {
  const appContext = React.useContext(AppContext);
  React.useEffect(() => { AuthUtils.logout(appContext); }, [appContext]); 
  return <></>;
}