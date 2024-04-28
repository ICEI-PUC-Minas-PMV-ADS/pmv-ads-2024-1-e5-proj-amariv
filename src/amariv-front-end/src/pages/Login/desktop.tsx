import React from 'react';
import AmarivLogo from '../../assets/images/amariv_logo.png';
import Login from './Login';
//import { signWithGoogle } from '../../AppFirebase';

/**
 * 
 * LoginPageDesktop
 */

export function LoginPageDesktop() {

  /**
   * Events
   */

  const handleLoginWithGoogle = React.useCallback(async () => {
    //await signWithGoogle();
  }, []);


  /**
   * Layout
   */

  return (
    <Login />
  );
}