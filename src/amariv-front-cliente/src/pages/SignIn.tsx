import logo from "../assets/amariv.png"
import Input from "../components/Inputs/Input";
import PasswordInput from "../components/Inputs/PasswordInput";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../types/RegisterForm";
import { useState } from "react";
import DynamicIcon from "../components/DynamicIcon";

function SignIn() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterForm>({
    nome: "",
    email: "",
    password: "",
    rePassword: "",
    celular: ""
  })
  const [passwordEspecial, setPasswordEspecial] = useState(false)
  const [passwordLenght, setPasswordLenght] = useState(false)
  const [passwordNumber, setPasswordNumber] = useState(false)
  const [passwordUppercase, setPasswordUppercase] = useState(false)
  const [passwordLowercase, setPasswordLowercase] = useState(false)

  const checkPasswordLenght = (senha: string) => {
    if (senha.length < 6) {
      setPasswordLenght(false)
      return false
    }
    setPasswordLenght(true)
    return true
  }

  const checkPasswordEspecial = (senha: string) => {
    const caracteresEspeciais = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!caracteresEspeciais.test(senha)) {
      setPasswordEspecial(false)
      return false;
    }
    setPasswordEspecial(true)
    return true
  }

  const checkPasswordNumber = (senha: string) => {
    const numeros = /[0-9]/;
    if (!numeros.test(senha)) {
      setPasswordNumber(false)
      return false;
    }
    setPasswordNumber(true)
    return true
  }

  const checkPasswordUpperCase = (senha: string) => {
    const maiusculas = /[A-Z]/;
    if (!maiusculas.test(senha)) {
      setPasswordUppercase(false)
      return false;
    }
    setPasswordUppercase(true)
    return true
  }

  const checkPasswordLowercase = (senha: string) => {
    const minusculas = /[a-z]/;
    if (!minusculas.test(senha)) {
      setPasswordLowercase(false)
      return false;
    }
    setPasswordLowercase(true)
    return true
  }

  function verificarSenha(senha: string) {
    checkPasswordEspecial(senha)
    checkPasswordNumber(senha)
    checkPasswordLenght(senha)
    checkPasswordLowercase(senha)
    checkPasswordUpperCase(senha)
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-primary-green to-[#3f5745] lg:py-6">
      <div className="w-full min-h-screen flex bg-light-green items-center flex-col justify-center gap-4 lg:w-[550px] lg:rounded-2xl lg:px-16 px-8">
        <img src={logo} className="w-36 mt-6" />
        <div className="w-full flex flex-col gap-2 mb-20 max-w-[360px]">
          <p className="text-4xl font-bold text-primary-green text-center mb-2">Cadastre-se</p>
          <Input title="Nome" titleColor="dark" value={form.nome}
            onChange={v => {
              let copiaForm = { ...form }
              copiaForm.nome = v.target.value
              setForm(copiaForm)
            }} />
          <Input title="Email" titleColor="dark" value={form.email}
            onChange={v => {
              let copiaForm = { ...form }
              copiaForm.email = v.target.value
              setForm(copiaForm)
            }} />
          <PasswordInput title="Senha" titleColor="dark" value={form.password}
            onChange={v => {
              verificarSenha(v.target.value)
              let copiaForm = { ...form }
              copiaForm.password = v.target.value
              setForm(copiaForm)
            }} />
          {
            form.password.length != 0 &&
            <div className="text-[10px] ml-2 mb-2">
              <div >
                <p className="font-bold">A senha deve conter:</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <DynamicIcon iconName={passwordLenght ? "IconCheck" : "IconX"} size={10} className={passwordLenght ? "text-green-600" : "text-red-500"} />
                <p>Pelo menos 6 caracteres</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <DynamicIcon iconName={passwordEspecial ? "IconCheck" : "IconX"} size={10} className={passwordEspecial ? "text-green-600" : "text-red-500"} />
                <p>Pelo menos um caractere especial</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <DynamicIcon iconName={passwordNumber ? "IconCheck" : "IconX"} size={10} className={passwordNumber ? "text-green-600" : "text-red-500"} />
                <p>Pelo menos um número</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <DynamicIcon iconName={passwordLowercase ? "IconCheck" : "IconX"} size={10} className={passwordLowercase ? "text-green-600" : "text-red-500"} />
                <p>Pelo menos uma letra minúscula</p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <DynamicIcon iconName={passwordUppercase ? "IconCheck" : "IconX"} size={10} className={passwordUppercase ? "text-green-600" : "text-red-500"} />
                <p>Pelo menos uma letra maiúscula</p>
              </div>
            </div>
          }

          <PasswordInput title="Confirmar senha" titleColor="dark" value={form.rePassword} onChange={v => {
            let copiaForm = { ...form }
            copiaForm.rePassword = v.target.value
            setForm(copiaForm)
          }} />
          <Input title="Celular" titleColor="dark" value={form.celular} mask="(99)99999-9999" onChange={v => {
            let copiaForm = { ...form }

            copiaForm.celular = v.target.value
            setForm(copiaForm)
          }} />
          <div className="w-full flex items-center justify-center">
            <div className="w-2/3 mt-6 max-w-[250px]">
              <PrimaryButton title="Cadastrar" />
            </div>
          </div>
          <p onClick={() => {
            navigate("/login")
          }}
            className="text-md mt-8 cursor-pointer text-primary-green text-center">Já possui uma conta? <span className="font-bold">Entrar</span></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;