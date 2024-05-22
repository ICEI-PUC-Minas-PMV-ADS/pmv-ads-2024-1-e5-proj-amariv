import React from 'react';
import AmarivLogo from '../../assets/images/amariv_logo.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { LoginContext } from './context';
import { AppContext } from '../../AppContext';
import { useNotification } from '../../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';

/**
 * Login desktop page.
 */

export function LoginDesktopPage() {
  const appContext = React.useContext(AppContext);
  const { state, controller } = LoginContext.usePageContext();
  const notification = useNotification();
  const navigate = useNavigate();

  /**
   * Events
   */

  const handleEmailChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    controller.setEmail(event.target.value);
  }, [controller]);

  const handlePasswordChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    controller.setPassword(event.target.value);
  }, [controller]);

  const handleSubmit = React.useCallback(async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await controller.submit(appContext, state);
      navigate('/', { replace: true });
    } catch (e: any) {
      notification({ title: "Login", message: e.message });
    }
  }, [appContext, state, controller, notification, navigate]);

  /**
   * Layout
   */

  return (
    <div className='w-screen h-screen bg-[#53735B] p-10 flex items-center flex-col'>
      <div className='w-[20rem]'>
        <div className='flex items-center flex-col'>
          <img src={AmarivLogo} alt="Amariv logo" className='w-[10rem] h-[7rem] mt-[6rem]' />
          <span className='text-[#FBFFF3] text-lg mt-2'>ACESSO RESTRITO</span>
        </div>
        <div className='w-full flex items-center flex-col mt-[3rem]'>
          <span className='w-full text-[#FBFFF3] text-lg ms-4 mt-2'>Entrar</span>

          <Input
            type='text'
            label='Login'
            labelColor='#E8F4EB'
            onChange={handleEmailChange}
            value={state.email} />

          <Input
            type='password'
            label='Senha'
            labelColor='#E8F4EB'
            onChange={handlePasswordChange}
            value={state.password} />

          <Button
            label='Entrar'
            className='w-[50%] mt-4'
            onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}