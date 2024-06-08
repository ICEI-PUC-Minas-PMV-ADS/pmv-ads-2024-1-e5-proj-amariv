import img from "../assets/home-image.jpeg"
import logo from "../assets/amariv.png"
import google from "../assets/google-logo.png"
import { useContext, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import PasswordInput from "../components/Inputs/PasswordInput";
import Input from "../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import { AppContext } from "../contexts/AuthContext/AppContext";
import { LoginForm } from "../types/LoginForm";
import { Alert } from "@mui/material";


function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const authContext = useContext(AppContext)
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [invalidFields, setInvalidFields] = useState(false)

  const validateInputs = (): boolean => {
    if (email == null || email == undefined || email == "") {
      setErrorEmail(true)
      return false
    }

    if (password == null || password == undefined || password == "") {
      setErrorPassword(true)
      return false
    }

    return true
  }


  const handleLogin = async () => {
    setLoading(true)
    let form: LoginForm = {
      email: email,
      password: password
    }
    let result = await authContext.login(form)
    setLoading(false)
    if (result) {
      navigate("/home")
    }
    else {
      setInvalidFields(true)
    }
  }

  return (
    <div className="w-full min-h-screen flex">
      <LoadingScreen open={loading} />
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
          <p className="text-4xl font-bold text-white">Entrar</p>
          <div className="w-full mt-2 max-w-[360px]">
            <Input
              title="Email"
              value={email}
              error={errorEmail}
              errorMessage="Digite um email"
              onChange={v => {
                setErrorEmail(false)
                setInvalidFields(false)
                setEmail(v.target.value)
              }}
            />
          </div>
          <div className="w-full mt-2 max-w-[360px]">
            <PasswordInput
              title="Senha"
              error={errorPassword}
              errorMessage="Digite uma senha"
              value={password}
              onChange={v => {
                setInvalidFields(false)
                setErrorPassword(false)
                setPassword(v.target.value)
              }} />
          </div>
          {
            invalidFields &&
            <div className="w-full mt-4 px-2">
              <Alert severity="error">Usuário e/ou senha inválidos</Alert>
            </div>
          }
          <div className="w-2/3 mt-6 max-w-[250px]">
            <PrimaryButton title="Entrar" color="secondary" onClick={() => {
              if (validateInputs()) {
                handleLogin()
              }
            }} />
          </div>
          <p onClick={() => {
            navigate("/signin")
          }}
            className="text-md mt-8 cursor-pointer text-white">Ainda não tem uma conta? <span className="font-bold">Cadastre-se</span></p>
          <div className="flex mt-8 items-center gap-2 flex-row justify-center">
            <div className="w-[80px] bg-white h-[1px]" />
            <p className="text-sm text-white">Ou entrar com</p>
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