import React from 'react';
import AmarivLogo from '../../assets/images/amariv_logo.png';
import { signWithGoogle } from '../../AppFirebase';

/**
 * 
 * LoginPageDesktop
 */

export function LoginPageDesktop() {

  /**
   * Events
   */

  const handleLoginWithGoogle = React.useCallback(async () => {
    await signWithGoogle();
  }, []);


  /**
   * Layout
   */

  return (
    <div className='w-screen h-screen bg-[#E8F4EB] p-10 flex items-center flex-col'>
      <img src={AmarivLogo} alt="Amariv logo" className='w-[15rem] h-[7.5rem]' />
      <div className='h-10'></div>
      <div className='cursor-pointer' onClick={handleLoginWithGoogle}>SignIn with Google</div>
    </div>
  );
}