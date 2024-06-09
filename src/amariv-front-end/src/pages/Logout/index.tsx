import React from "react";
import { AuthUtils } from "../../utils/AuthUtils";
import { AppContext } from "../../AppContext";

/**
 * Logout
 */

export const Logout = () => {
  const { state, dispatch } = React.useContext(AppContext);
  AuthUtils.logout({ state, dispatch });
  return (<></>);
};