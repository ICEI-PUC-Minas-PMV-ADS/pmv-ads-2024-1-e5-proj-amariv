import PrimaryButton from "../components/PrimaryButton";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useState } from "react";
import { Alert } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import Input from "../components/Inputs/Input";
import { UserService } from "../services/UserService";
import DynamicIcon from "../components/DynamicIcon";
import PasswordInput from "../components/Inputs/PasswordInput";

function RecoveryPassword() {

  const navigate = useNavigate()
  let { email, codigo } = useParams();

  const [sended, setSended] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [form, setForm] = useState({
    email: email as string,
    codigoRecuperacao: codigo as string,
    password: "",
    rePassword: ""
  })
  const [errorEmail, setErrorEmail] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [repasswordError, setRepasswordError] = useState(false)

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

  const validarCampos = () => {
    if (
      !checkPasswordEspecial(form.password) ||
      !checkPasswordNumber(form.password) ||
      !checkPasswordLenght(form.password) ||
      !checkPasswordLowercase(form.password) ||
      !checkPasswordUpperCase(form.password)
    ) {
      setPasswordError(true)
      return false
    }

    if (form.password != form.rePassword) {
      setRepasswordError(true)
      return false
    }

    return true
  }

  function verificarSenha(senha: string) {
    checkPasswordEspecial(senha)
    checkPasswordNumber(senha)
    checkPasswordLenght(senha)
    checkPasswordLowercase(senha)
    checkPasswordUpperCase(senha)
  }

  const handleSend = async () => {
    setLoading(true)

    await UserService.recuperaSenha(form).then(x => {
      setSended(true)
    }).catch((x) => {
      setServerError(true)
    })

    setLoading(false)
  }

  return (
    <>
      <LoadingScreen open={loading} />

      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3f5745] to-primary-green lg:py-6">
        <div className="w-full min-h-screen md:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
          <TopBar title="Recuperar senha" OnClickBack={() => { navigate("/login") }} />
          {
            sended == false &&
            <>
              <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
                <p className="text-3xl font-bold text-primary-green mt-8">Recuperar senha</p>
                <p className="text-md font-light text-primary-green mb-6">{email}</p>
                <div className="w-full flex flex-col gap-2 mb-6">
                  <PasswordInput title="Nova senha" titleColor="dark" value={form.password}
                    error={passwordError}
                    errorMessage="Digite um senha válida"
                    requiredField
                    onChange={v => {
                      setPasswordError(false)
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

                  <PasswordInput title="Confirmar senha" titleColor="dark" value={form.rePassword}
                    requiredField
                    error={repasswordError}
                    errorMessage="As senhas digitadas não coincidem"
                    onChange={v => {
                      setRepasswordError(false)
                      let copiaForm = { ...form }
                      copiaForm.rePassword = v.target.value
                      setForm(copiaForm)
                    }} />
                </div>
              </div>
              {
                serverError &&
                <div className="w-full mt-4 px-6 max-w-[420px]">
                  <Alert severity="error">Erro ao comunicar com o servidor. Tente novamente mais tarde.</Alert>
                </div>
              }
              <div className="w-full flex items-center justify-center">
                <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                  <PrimaryButton title="Enviar" leftIcon="IconCheck" onClick={async () => {
                    if (validarCampos()) {
                      handleSend()
                    }
                  }} />
                </div>
              </div>
            </>
          }
          {
            sended == true &&
            <div className="w-full flex flex-col gap-2 max-w-[420px] px-6 mb-8">
              <p className="text-2xl font-bold text-primary-green mb-6 mt-8">Senha recuperada com sucesso!</p>
              <PrimaryButton title="Fazer login" leftIcon="IconLogin" onClick={async () => {
                navigate("/login")
              }} />
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default RecoveryPassword;