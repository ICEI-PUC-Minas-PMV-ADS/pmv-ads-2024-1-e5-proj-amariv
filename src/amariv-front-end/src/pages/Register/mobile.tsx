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
export function RegisterPageMobile() {
  const appContext = React.useContext(AppContext);
  const navigate = useNavigate();

  /**
   * States
   */

  const [name, setName] = React.useState("John");
  const [email, setEmail] = React.useState("john@email.com");
  const [phone, setPhone] = React.useState("(31) 5555-5555");
  const [password, setPassword] = React.useState("@Test123");
  const [confPassword, setConfPassword] = React.useState("@Test123");
  const [nameError, setNameError] = React.useState<string|undefined>();
  const [emailError, setEmailError] = React.useState<string|undefined>();
  const [phoneError, setPhoneError] = React.useState<string|undefined>();
  const [passwordError, setPasswordError] = React.useState<string|undefined>();
  const [confPasswordError, setConfPasswordError] = React.useState<string|undefined>();
  const [error, setError] = React.useState<string|undefined>();

  /**
   * Events
   */

  const handleSubmit = React.useCallback(async () => {
    try {
      if (name.trim().length === 0) {
        setNameError('Este campo é obrigatorio e deve ser prenchido!');
        return;
      } else {
        setNameError(undefined);
      }
      if (email.trim().length === 0) {
        setEmailError('Este campo é obrigatorio e deve ser prenchido!');
        return;
      } else {
        setEmailError(undefined);
      }
      if (password.trim().length === 0) {
        setPasswordError('Este campo é obrigatorio e deve ser prenchido!');
        return;
      } else {
        setPasswordError(undefined);
      }
      if (password !== confPassword) {
        setConfPasswordError('A confirmação de senha é diferente da senha!');
        return;
      } else {
        setConfPasswordError(undefined);
      }
      if (!MaskedUtils.isValidPhone(phone) && !MaskedUtils.isValidMobile(phone)) {
        setPhoneError('Este campo deve ter um numero de telefone valido!');
        return;
      } else {
        setPhoneError(undefined);
      }

      AuthUtils.login(appContext, await UserService
        .signIn({ name, email, password, confPassword, phone }));

      navigate('/home');
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }, [appContext, name, email, password, confPassword, phone, navigate]);

  const handlePhoneMask = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const maskedUtils = new MaskedUtils(evt.target.value);      
      if (maskedUtils.hasChanged()) {
        setPhone(maskedUtils.getMaskedValue());
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  /**
   * Layout
   */

  return (
    <AlertModal message={error} onDismiss={() => setError(undefined)}>
      <div className='w-screen h-screen bg-[#E8F4EB] p-10 flex items-center flex-col'>
        <img src={AmarivLogo} alt="Amariv logo" className='w-[10rem] h-[5rem]' />
        <h2 className='text-[#53735B] text-[1.75rem]'>Cadastro</h2>
        <Form>
          <Input
            type='text'
            label='Nome'
            onChange={(evt) => { setName(evt.target.value) }}
            value={name}
            error={nameError}
            required />
          <Input
            type='email'
            label='Email'
            onChange={(evt) => { setEmail(evt.target.value) }}
            value={email}
            error={emailError}
            required/>
          <Input
            type='password'
            label='Senha'
            onChange={(evt) => { setPassword(evt.target.value) }}
            value={password}
            error={passwordError}
            required
            minLength={6} />
          <Input
            type='password'
            label='Confirmar senha'
            onChange={(evt) => {
              setConfPassword(evt.target.value)
            }}
            value={confPassword}
            error={confPasswordError}
            required
            minLength={6} />
          <Input
            type='text'
            label='Telefone'
            onChange={handlePhoneMask}
            value={phone}
            error={phoneError}
            required />
          <p className='text-[#666666] text-xs my-4 cursor-pointer' onClick={() => { navigate('/login') }}>Ir para login</p>
          <Button type='button' label='Cadastrar' className='w-[60%]' onClick={handleSubmit} />
        </Form>
      </div>
    </AlertModal>
  );
}