import React from 'react';
import { AuthUtils } from '../../utils/AuthUtils';
import { AppContext } from '../../AppContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { isDesktop } from 'react-device-detect';
import { RegisterPageDesktop } from './desktop';
import { RegisterPageMobile } from "./mobile";
import './index.css';

/**
 * Register page
 */
export function RegisterPage() {
  const appContext = React.useContext(AppContext);

  /**
   * Redirect if authenticated.
   */
  
  if (AuthUtils.isAuth(appContext)) {
    return <Navigate to='/home' replace={true} />
  }

  /**
   * Layout
   */

  return (
    <>
      {isDesktop
        ? <RegisterPageDesktop />
        : <RegisterPageMobile />}
    </>
  );
}