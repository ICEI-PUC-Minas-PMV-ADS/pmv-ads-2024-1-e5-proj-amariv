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
import SelectInput from "./Inputs/SelectInput";
import SelectModal from "./SelectModal";
import { Material } from "../types/Material";
import { UpdateUsuarioForm } from "../types/UpdateUsuarioForm";

type props = {
  isOpen: boolean,
  onClose: () => void

}

function UpdateUsuario({ isOpen, onClose }: props) {

  const authContext = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState<UpdateUsuarioForm>({
    nome: authContext.user?.nome as string,
    celular: authContext.user?.celular as string,
    telefone: authContext.user?.telefone ? authContext.user?.telefone : ""
  })
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [celularError, setCelularError] = useState(false)
  const [telefoneError, setTelefoneError] = useState(false)
  const [nomeError, setNomeError] = useState(false)

  const [updateError, setUpdateError] = useState(false)

  const validarCampos = () => {
    if (form.nome == null || form.nome == "" || form.nome == undefined) {
      setNomeError(true)
      return false
    }

    if (form.celular.length <= 10 || form.celular == null || form.celular == undefined) {
      setCelularError(true)
      return false
    }

    if (form.telefone != null && form.telefone != undefined && form.telefone.length < 10 && form.telefone.length > 0) {
      setTelefoneError(true)
      return false
    }
    return true
  }

  const handleSave = async () => {
    setLoading(true)
    let result = await authContext.updateUsuario(form)
    if (result) {
      setSnackBarOpen(true)
      onClose()
    }
    else {
      setUpdateError(true)
    }
    setLoading(false)
  }


  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBarOpen}
        onClose={() => { setSnackBarOpen(false) }}
        autoHideDuration={3000}
        message="Dados alterados com sucesso!"
      />
      <Modal open={isOpen} className=" overflow-y-scroll" onClose={onClose}>
        <div>
          <LoadingScreen open={loading} /><LoadingScreen open={loading} />
          <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6">
            <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
              <TopBar title="Editar dados" OnClickBack={onClose} />
              <div className="w-full flex flex-col gap-2 max-w-[420px] px-6 mt-8 mb-2">
                <Input title="Nome" titleColor="dark" value={form.nome}
                  requiredField
                  error={nomeError}
                  errorMessage="Digite um nome"
                  onChange={v => {
                    setNomeError(false)
                    let copiaForm = { ...form }
                    copiaForm.nome = v.target.value
                    setForm(copiaForm)
                  }} />
                <Input title="Celular" titleColor="dark" value={form.celular} mask="(99)99999-9999"
                  error={celularError}
                  errorMessage="Digite um número de celular válido. Ex: (31)97575-7575"
                  requiredField
                  onChange={v => {
                    setCelularError(false)
                    let copiaForm = { ...form }
                    copiaForm.celular = v.target.value.replace(/\D/g, '')
                    setForm(copiaForm)
                  }} />
                <Input title="Celular/Telefone" titleColor="dark" value={form.telefone as string} mask={form.telefone ? (form.telefone?.length < 10 ? "(99)9999-9999" : "(99)99999-9999") : ""}
                  error={telefoneError}
                  errorMessage="Digite um número válido. Ex: (31)9999-9999"
                  requiredField
                  onChange={v => {
                    setTelefoneError(false)
                    let copiaForm = { ...form }
                    copiaForm.telefone = v.target.value.replace(/\D/g, '')
                    setForm(copiaForm)
                  }} />
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                {
                  updateError &&
                  <div className="w-full mt-4 px-6 ">
                    <Alert severity="error">Erro ao comunicar com o servidor. Tente novamente mais tarde.</Alert>
                  </div>
                }
                <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                  <PrimaryButton title="Salvar" leftIcon="IconCheck" onClick={() => {
                    if (validarCampos()) {
                      handleSave()
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

export default UpdateUsuario;