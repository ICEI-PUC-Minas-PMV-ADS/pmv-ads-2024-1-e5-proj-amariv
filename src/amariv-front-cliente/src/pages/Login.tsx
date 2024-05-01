import img from "../assets/home-image.jpeg"
import logo from "../assets/amariv.png"
import google from "../assets/google-logo.png"
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import SearchInput from "../components/Inputs/SearchInput";
import PasswordInput from "../components/Inputs/PasswordInput";
import Input from "../components/Inputs/Input";



function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="w-full min-h-screen flex">
      <div className="md:w-[550px] w-full min-h-screen bg-primary-green z-10 flex flex-col justify-center items-center p-8 md:p-20">
        <img src={logo} alt="Imagem" className="h-[80px] md:h-[100px] md:mb-12 mb-8" />
        <text className="text-2xl md:text-4xl font-semibold text-white">Login</text>
        <div className="w-full mt-2">
          <Input
            title="Email"
            value={email}
            onChange={v => {
              setEmail(v.target.value)
            }}
          />
        </div>
        <div className="w-full mt-2">
          <PasswordInput
            title="Senha"
            value={password}
            onChange={v => {
              setPassword(v.target.value)
            }} />
        </div>
        <div className="w-2/3 mt-6">
          <PrimaryButton title="Entrar" color="secondary" />
        </div>
        <text className="text-md mt-8 cursor-pointer text-white">Ainda não tem uma conta? <text className="font-bold">Cadastre-se</text></text>
        <div className="flex mt-8 items-center gap-2 flex-row justify-center">
          <div className="w-[80px] bg-white h-[1px]" />
          <text className="text-sm text-white">Ou entrar com</text>
          <div className="w-[80px] bg-white h-[1px]" />
        </div>
        <img src={google} alt="Imagem" className="md:w-[50px] mt-8 w-[40px] cursor-pointer" />
      </div>
      <div className="flex-1">
        <img src={img} alt="Imagem" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default Login;