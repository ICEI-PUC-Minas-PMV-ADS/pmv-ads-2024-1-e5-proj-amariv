import React from 'react';
import AmarivLogo from '../assets/images/amariv_logo.png';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * StartPage
 */

export function StartPage() {
  const navigate = useNavigate();

  /**
   * Events
   */

  const handleRegister = React.useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleEnter = React.useCallback(() => {
    navigate('/register');
  }, [navigate]);

  const handleCollectSchedule = React.useCallback(() => {
    navigate('/register');
  }, [navigate]);

  /**
   * Layout
   */

  return (
    <div className='w-screen h-screen bg-[#E8F4EB] p-10 flex items-center flex-col'>
      <img src={AmarivLogo} alt="Amariv logo" className='w-[10rem] h-[5rem]' />
      <div className='h-10'></div>
      <h2 className='text-[#53735B] text-[1.75rem]'>Bem vindo!</h2>
      <p className='text-center text-[#53735B] text-sm'>
        à Associação de Catadores de Materiais Recicláveis da Ilha de Vitoria.
      </p>
      <Button color='secondary' label='Entrar' className='w-[60%] mt-20 mb-10' onClick={handleEnter}/>
      <p className='text-center text-[#53735B] text-sm'>
        Ainda não tem uma conta? <span className='cursor-pointer' onClick={handleRegister}><strong>Cadastre-se</strong></span>
      </p>
      <div className='w-[70%] flex items-center my-4'>
        <div className='flex-1 h-[1px] border-b-[1px] border-[#53735B]'></div>
        <div className='text-center text-[#53735B] text-sm px-4'>Ou</div>
        <div className='flex-1 h-[1px] border-b-[1px] border-[#53735B]'></div>
      </div>
      <p className='text-center text-[#53735B] text-sm' onClick={handleCollectSchedule}>
        <strong>Faça Agendamento<br />de coleta sem cadastro</strong>
      </p>
    </div>
  );
}