import React from "react";
import img from "../../assets/images/background-login.png";
import logo from "../../assets/images/amariv_logo.png";
import google from "../../assets/images/google-logo.png";
import { Button } from "../../components/Button";
import { useState } from "react";
import { UserService } from "../../services/UserService";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthUtils } from "../../utils/AuthUtils";
import { AppContext } from "../../AppContext";

/**
 * Login
 */

export function Login() {
  const navigate = useNavigate();
  const appContext = React.useContext(AppContext);

  /**
   * States
   */

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  /**
   * Events
   */

  const handleLogin = React.useCallback(async () => {
    try {
      const token = await UserService.login({ email, password });
      AuthUtils.login(appContext, token);
    } catch (e) {
    }
  }, [appContext, email, password]);

  const handleRegister = React.useCallback(() => {
    navigate("/register", { replace: true });
  }, [navigate]);

  const handleGoogle = React.useCallback(() => {
    // TODO: Implementar.
  }, []);

  /**
   * Redirect
   */

  if (AuthUtils.isAuth(appContext)) {
    return <Navigate to='/home' replace={true} /> 
  }

  /**
   * Layout
   */

  return (
    <div className="w-full h-full flex">
      <div className="md:w-[550px] w-full h-full bg-primary-backgroud z-10 flex flex-col justify-center items-center p-8 md:p-20">
        <img src={logo} alt="Imagem" className="h-[80px] md:h-[100px] md:mb-12 mb-8" />
        <div className="text-2xl md:text-4xl font-semibold text-white">Login</div>
        <div className='flex flex-col w-full my-2'>
          <label className='mb-[.5rem] ml-[.75rem] text-white text-xs'>Email</label>
          <input
            className='py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646] text-black'
            value={email}
            onChange={v => {
              setEmail(v.target.value)
            }}
          />
        </div>
        <div className='flex flex-col w-full my-2'>
          <label className='mb-[.5rem] ml-[.75rem] text-white text-xs'>Senha</label>
          <input
            className='py-2 px-4 rounded-full bg-[#FBFFF3] border-[1px] border-[#004646] text-black'
            value={password}
            onChange={v => {
              setPassword(v.target.value)
            }}
          />
        </div>
        <div className="w-2/3 mt-6">
          <Button label="Entrar" onClick={() => { handleLogin() }} />
        </div>
        <div className="text-md mt-8 cursor-pointer text-white flex flex-row">
          <div className="me-2">Ainda não tem uma conta?</div>
          <div className="font-bold" onClick={handleRegister}>Cadastre-se</div>
        </div>
        <div className="flex mt-8 items-center gap-2 flex-row justify-center">
          <div className="w-[80px] bg-white h-[1px]" />
          <div className="text-sm text-white">Ou entrar com</div>
          <div className="w-[80px] bg-white h-[1px]" />
        </div>
        <img src={google} alt="Imagem" className="md:h-[50px] mt-8 w-[40px]" onClick={handleGoogle} />
      </div>
      <div className="flex-1">
        <img src={img} alt="Imagem" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}