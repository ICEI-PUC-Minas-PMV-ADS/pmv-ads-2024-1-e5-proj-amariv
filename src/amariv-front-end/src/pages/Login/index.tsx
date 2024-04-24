import { isDesktop } from 'react-device-detect';
import { LoginPageMobile } from './mobile';
import { LoginPageDesktop } from './desktop';

/**
 * 
 * LoginPage
 */

export function LoginPage() {

  /**
   * Layout
   */

  return (
    <>
      {!isDesktop
        ? <LoginPageMobile />
        : <LoginPageDesktop />
      }
    </>
  );
}