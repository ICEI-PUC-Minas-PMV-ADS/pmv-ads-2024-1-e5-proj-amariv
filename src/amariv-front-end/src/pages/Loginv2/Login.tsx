import img from "../../assets/images/background-login.png"
import { Input } from "../../components/Input";
import logo from "../../assets/images/amariv_logo.png"
import { Button } from "../../components/Button";
import google from "../../assets/images/google-logo.png"
import { useState } from "react";



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="w-full h-full flex">
      <div className="md:w-[550px] w-full h-full bg-primary-backgroud z-10 flex flex-col justify-center items-center p-8 md:p-20">
        <img src={logo} alt="Imagem" className="h-[80px] md:h-[100px] md:mb-12 mb-8" />
        <text className="text-2xl md:text-4xl font-semibold text-white">Login</text>
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
          <Button label="Entrar" onClick={() => {
            //logar
          }} />
        </div>
        <text className="text-md mt-8 cursor-pointer text-white">Ainda não tem uma conta? <text className="font-bold">Cadastre-se</text></text>
        <div className="flex mt-8 items-center gap-2 flex-row justify-center">
          <div className="w-[80px] bg-white h-[1px]" />
          <text className="text-sm text-white">Ou entrar com</text>
          <div className="w-[80px] bg-white h-[1px]" />
        </div>
        <img src={google} alt="Imagem" className="md:h-[50px] mt-8 w-[40px]" />
      </div>
      <div className="flex-1">
        <img src={img} alt="Imagem" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default Login;