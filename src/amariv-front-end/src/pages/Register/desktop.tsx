import React from 'react';
import AmarivLogo from '../../assets/images/amariv_logo.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Form } from '../../components/Form';
import { MaskedUtils } from '../../utils/MaskedUtils';
import { UserService } from '../../services/UserService';
import { AuthUtils } from '../../utils/AuthUtils';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import { AlertModal } from '../../components/AlertModal';
import './index.css';

/**
 * Register page
 */
export function RegisterPageDesktop() {
  const appContext = React.useContext(AppContext);
  const navigate = useNavigate();

  /**
   * States
   */

  const form = React.useRef<HTMLFormElement>(null);
  const phoneInput = React.useRef<HTMLInputElement>(null);
  const confPasswordInput = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState("John");
  const [email, setEmail] = React.useState("john@email.com");
  const [phone, setPhone] = React.useState("(31) 5555-5555");
  const [password, setPassword] = React.useState("@Test123");
  const [confPassword, setConfPassword] = React.useState("@Test123");
  const [error, setError] = React.useState<string|undefined>();

  /**
   * Events
   */

  const handleSubmit = React.useCallback(async () => {
    try {
      if (password !== confPassword) {
        confPasswordInput.current?.setCustomValidity('A confirmação de senha é diferente da senha!');
        return;
      } else {
        confPasswordInput.current?.setCustomValidity('');
      }

      if (!MaskedUtils.isValidPhone(phone) && !MaskedUtils.isValidMobile(phone)) {
        phoneInput.current?.setCustomValidity('Este campo deve ter um numero de telefone valido!');
        return;
      } else {
        phoneInput.current?.setCustomValidity('');
      }
      if (form.current?.checkValidity()) {        
          AuthUtils.login(appContext, await UserService
            .signIn({ name, email, password, confPassword, phone }));

          navigate('/home');
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [appContext, name, email, password, confPassword, phone, navigate]);

  const handlePhoneMask = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (phoneInput.current) {
        phoneInput.current.setCustomValidity('');
      }
      const maskedUtils = new MaskedUtils(evt.target.value);      
      if (maskedUtils.hasChanged()) {
        setPhone(maskedUtils.getMaskedValue());
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, []);

  /**
   * Layout
   */

  return (
    <AlertModal message={error} onDismiss={() => setError(undefined)}>
      <div className='flex w-full h-full bg-amariv justify-center items-center'>
        <div className='mx-8 w-[30rem] bg-[#E8F4EB] shadow-2xl p-10 flex items-center flex-col'>
          <img src={AmarivLogo} alt="Amariv logo" className='w-[10rem] h-[5rem]' />
          <h2 className='text-[#53735B] text-[1.75rem]'>Cadastro</h2>
          <Form ref={form}>
            <Input
              type='text'
              label='Nome'
              onChange={(evt) => { setName(evt.target.value) }}
              value={name}
              required />
            <Input
              type='email'
              label='Email'
              onChange={(evt) => { setEmail(evt.target.value) }}
              value={email}
              required/>
            <Input
              type='password'
              label='Senha'
              onChange={(evt) => { setPassword(evt.target.value) }}
              value={password}
              required
              minLength={6} />
            <Input
              ref={confPasswordInput}
              type='password'
              label='Confirmar senha'
              onChange={(evt) => {
                setConfPassword(evt.target.value)
              }}
              value={confPassword}
              required
              minLength={6} />
            <Input
              ref={phoneInput}
              type='text'
              label='Telefone'
              onChange={handlePhoneMask}
              value={phone}
              required />
            <p className='text-[#666666] text-xs my-4 cursor-pointer' onClick={() => { navigate('/login') }}>Ir para login</p>
            <Button type='button' label='Cadastrar' className='w-[60%]' onClick={handleSubmit} />
          </Form>
        </div>
      </div>
    </AlertModal>
  );
}