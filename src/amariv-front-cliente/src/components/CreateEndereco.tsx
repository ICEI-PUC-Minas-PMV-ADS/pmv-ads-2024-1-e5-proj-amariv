import Input from "./Inputs/Input";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { useContext, useState } from "react";
import { EnderecoForm } from "../types/EnderecoForm";
import { ViaCepService } from "../services/ViaCepService";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { EnderecoService } from "../services/EnderecoService";
import LoadingScreen from "./LoadingScreen";
import { Alert, Modal, Snackbar } from "@mui/material";

type props = {
  isOpen: boolean,
  onClose: () => void
  onConfirm?: (idNewEndereco: number) => void
}

function CreateEndereco({ isOpen, onClose, onConfirm }: props) {
  const cepRegex = /^[0-9]{8}$/
  const [serverError, setServerError] = useState(false)
  const [loading, setLoading] = useState(false)
  const authContext = useContext(AuthContext)
  const [form, setForm] = useState<EnderecoForm>({
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    referencia: "",
    userId: authContext.user?.id
  })
  const [snackBarOpen, setSnackBarOpen] = useState(false)

  const [loadingCep, setLoadingCep] = useState(false)
  const [errorCep, setErrorCep] = useState(false)
  const [errorLogradouro, setErrorLogradouro] = useState(false)
  const [errorNumero, setErrorNumero] = useState(false)
  const [errorBairro, setErrorBairro] = useState(false)
  const [errorCidade, setErrorCidade] = useState(false)

  const validarCampos = () => {
    if (form.cep == undefined || !cepRegex.test(form.cep)) {
      setErrorCep(true)
      return false
    }

    if (form.logradouro == null || form.logradouro == "" || form.logradouro == undefined) {
      setErrorLogradouro(true)
      return false
    }

    if (form.numero == null || form.numero == "" || form.numero == undefined) {
      setErrorNumero(true)
      return false
    }

    if (form.bairro == null || form.bairro == "" || form.bairro == undefined) {
      setErrorBairro(true)
      return false
    }

    if (form.cidade == null || form.cidade == "" || form.cidade == undefined) {
      setErrorCidade(true)
      return false
    }

    return true
  }

  const handleEndereco = async () => {
    setLoading(true)
    await EnderecoService.cadastrarEndereco(form).then(async (r) => {
      await authContext.atualizarEnderecos()
      setSnackBarOpen(true)
      onClose()
      if (onConfirm)
        onConfirm(Number.parseInt(r.data.successes[0].message))
    }).catch(e => {
      setServerError(true)
    })
    setLoading(false)
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        onClose={() => { setSnackBarOpen(false) }}
        autoHideDuration={3000}
        message="Endereço salvo com sucesso!"
      />
      <Modal open={isOpen} className=" overflow-y-scroll" onClose={onClose}>
        <div>
          <LoadingScreen open={loading} /><LoadingScreen open={loading} />
          <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6">
            <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
              <TopBar title="Novo endereço" OnClickBack={onClose} />
              <div className="w-full flex flex-col gap-2 max-w-[420px] px-6 mt-8 mb-2">
                <Input title="CEP"
                  titleColor="dark"
                  mask="99999-999"
                  requiredField
                  value={form.cep}
                  error={errorCep}
                  rightLoading={loadingCep}
                  errorMessage="Digite um CEP válido"
                  onChange={v => {
                    setErrorCep(false)
                    let copiaForm = { ...form }
                    copiaForm.cep = v.target.value.replace(/\D/g, '')
                    setForm(copiaForm)
                  }}
                  onChangeDebounce={async (value) => {
                    if (cepRegex.test(value) && value != "") {
                      setLoadingCep(true)
                      let result = await ViaCepService.buscarEndereco(value)

                      if (result.erro == null || result.erro == undefined) {
                        let copiaForm = { ...form }
                        copiaForm.logradouro = result.logradouro
                        copiaForm.bairro = result.bairro
                        copiaForm.cidade = result.localidade
                        setForm(copiaForm)
                      }
                      setLoadingCep(false)
                    }
                    else if (!cepRegex.test(value) && value != "") {
                      setErrorCep(true)
                    }
                  }}
                />
                <Input
                  title="Logradouro"
                  error={errorLogradouro}
                  errorMessage="Digite um logradouro"
                  titleColor="dark"
                  requiredField
                  value={form.logradouro}
                  onChange={v => {
                    setErrorLogradouro(false)
                    let copiaForm = { ...form }
                    copiaForm.logradouro = v.target.value
                    setForm(copiaForm)
                  }} />
                <Input title="Número"
                  error={errorNumero}
                  errorMessage="Digite um número"
                  titleColor="dark"
                  requiredField
                  type="number"
                  value={form.numero}
                  onChange={v => {
                    setErrorNumero(false)
                    let copiaForm = { ...form }
                    copiaForm.numero = v.target.value.replace(/\D/g, '')
                    setForm(copiaForm)
                  }} />
                <Input
                  title="Bairro"
                  error={errorBairro}
                  errorMessage="Digite um bairro"
                  titleColor="dark"
                  requiredField
                  value={form.bairro}
                  onChange={v => {
                    setErrorBairro(false)
                    let copiaForm = { ...form }
                    copiaForm.bairro = v.target.value
                    setForm(copiaForm)
                  }} />
                <Input
                  title="Cidade"
                  error={errorCidade}
                  errorMessage="Digite uma cidade"
                  titleColor="dark"
                  requiredField
                  value={form.cidade}
                  onChange={v => {
                    setErrorCidade(false)
                    let copiaForm = { ...form }
                    copiaForm.cidade = v.target.value
                    setForm(copiaForm)
                  }} />
                <Input
                  title="Referência"
                  titleColor="dark"
                  onChange={v => {
                    let copiaForm = { ...form }
                    copiaForm.referencia = v.target.value
                    setForm(copiaForm)
                  }} />
              </div>
              {
                serverError &&
                <div className="w-full mt-4 px-6 max-w-[420px]">
                  <Alert severity="error">Erro ao comunicar com o servidor. Tente novamente mais tarde.</Alert>
                </div>
              }
              <div className="w-full flex items-center justify-center">
                <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                  <PrimaryButton title="Salvar endereço" leftIcon="IconCheck" onClick={() => {
                    if (validarCampos()) {
                      handleEndereco()
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateEndereco;