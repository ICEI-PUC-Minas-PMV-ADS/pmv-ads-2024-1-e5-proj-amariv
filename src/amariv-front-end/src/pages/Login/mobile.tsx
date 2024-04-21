import AmarivLogo from '../../assets/images/amariv_logo.png';

/**
 * 
 * LoginPageMobile
 */

export function LoginPageMobile() {

  /**
   * Events
   */

  /**
   * Layout
   */

  return (
    <div className='w-screen h-screen bg-[#E8F4EB] p-10 flex items-center flex-col'>
      <img src={AmarivLogo} alt="Amariv logo" className='w-[15rem] h-[7.5rem]' />
      <div className='h-10'></div>
    </div>
  );
}