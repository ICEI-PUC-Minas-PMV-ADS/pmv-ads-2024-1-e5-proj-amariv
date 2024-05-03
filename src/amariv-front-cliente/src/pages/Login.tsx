import img from "../assets/home-image.jpeg"
import logo from "../assets/amariv.png"
import google from "../assets/google-logo.png"
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import PasswordInput from "../components/Inputs/PasswordInput";
import Input from "../components/Inputs/Input";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="w-full min-h-screen flex">
      <div className="md:w-[550px] w-full min-h-screen bg-primary-green z-10 p-4 lg:p-6">
        <div className="w-full flex justify-between">
          <img src={logo} className="w-20" />
          <div className="w-[50%] flex justify-center items-center max-w-[250px]">
            <PrimaryButton title="Agendar sem entrar" color="transparent" onClick={() => {
              navigate("/agendamento")
            }} />
          </div>
        </div>
        <div className="flex flex-col items-center p-5 md:px-16 md:pt-12 mt-4">
          <text className="text-4xl font-bold text-white">Entrar</text>
          <div className="w-full mt-2 max-w-[360px]">
            <Input
              title="Email"
              value={email}
              onChange={v => {
                setEmail(v.target.value)
              }}
            />
          </div>
          <div className="w-full mt-2 max-w-[360px]">
            <PasswordInput
              title="Senha"
              value={password}
              onChange={v => {
                setPassword(v.target.value)
              }} />
          </div>
          <div className="w-2/3 mt-6 max-w-[250px]">
            <PrimaryButton title="Entrar" color="secondary" />
          </div>
          <text onClick={() => {
            navigate("/signin")
          }}
            className="text-md mt-8 cursor-pointer text-white">Ainda não tem uma conta? <text className="font-bold">Cadastre-se</text></text>
          <div className="flex mt-8 items-center gap-2 flex-row justify-center">
            <div className="w-[80px] bg-white h-[1px]" />
            <text className="text-sm text-white">Ou entrar com</text>
            <div className="w-[80px] bg-white h-[1px]" />
          </div>
          <img src={google} alt="Imagem" className="md:w-[50px] mt-8 w-[40px] cursor-pointer" />
        </div>

      </div>
      <div className="flex-1">
        <img src={img} alt="Imagem" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default Login;