import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useState } from "react";
import { Alert } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import Input from "../components/Inputs/Input";
import { UserService } from "../services/UserService";
import DynamicIcon from "../components/DynamicIcon";

function RequestRecover() {

  const navigate = useNavigate()

  const [sended, setSended] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)
  const [form, setForm] = useState({
    email: ""
  })
  const [errorEmail, setErrorEmail] = useState(false)

  const validarCampo = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(form.email)) {
      setErrorEmail(true)
      return false
    }
    return true
  }

  const handleSend = async () => {
    setLoading(true)

    await UserService.enviaRecuperaSenha(form).then(x => {
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
          <TopBar title="Solicitar recuperação de senha" OnClickBack={() => { navigate("/login") }} />
          {
            sended == false &&
            <>
              <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
                <p className="text-3xl font-bold text-primary-green mb-2 mt-8">Solicitar recuperação de senha</p>
                <p className="font-semilight text-primary-green mb-4 text-md">Por favor, insira seu endereço de e-mail abaixo. Um link de recuperação de senha será enviado.</p>
                <div className="w-full">
                  <Input
                    title="Email"
                    titleColor="dark"
                    value={form.email}
                    error={errorEmail}
                    errorMessage="Digite um email válido. Ex: email@email.com.br"
                    onChange={v => {
                      setErrorEmail(false)
                      let copyForm = { ...form }
                      copyForm.email = v.target.value
                      setForm(copyForm)
                    }}
                  />
                </div>
              </div>
              {
                serverError &&
                <div className="w-full mt-4 px-6 max-w-[420px]">
                  <Alert severity="error">Este e-mail não pertence a nenhum usuário.</Alert>
                </div>
              }
              <div className="w-full flex items-center justify-center">
                <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                  <PrimaryButton title="Enviar" leftIcon="IconCheck" onClick={async () => {
                    if (validarCampo()) {
                      handleSend()
                    }
                  }} />
                </div>
              </div>
            </>
          }
          {
            sended == true &&
            <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
              <p className="text-2xl font-bold text-primary-green mb-2 mt-8">Email de recuperação enviado com sucesso!</p>
              <div className="w-full flex items-center justify-center mb-8 text-primary-green">
                <DynamicIcon iconName="IconCheckbox" size={100} />
              </div>

            </div>
          }
        </div>
      </div>
    </>
  );
}

export default RequestRecover;