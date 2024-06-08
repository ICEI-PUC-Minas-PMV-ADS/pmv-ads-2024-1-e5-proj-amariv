import Input from "../components/Inputs/Input";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import img from "../assets/sem-dados.png"
import { useContext, useState } from "react";
import { EnderecoForm } from "../types/EnderecoForm";
import { AppContext } from "../contexts/AuthContext/AppContext";
import { ViaCepService } from "../services/ViaCepService";
import { CreateColetaForm } from "../types/CreateColetaForm";
import dayjs from "dayjs";
import DatePicker from "../components/DatePicker";
import SelectInput from "../components/Inputs/SelectInput";
import dataUtils from "../utils/dataUtils";
import { tv } from "tailwind-variants";
import AddMaterial from "../components/AddMaterial";
import { Alert } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { EnderecoService } from "../services/EnderecoService";
import { GoogleService } from "../services/GoogleService";
import { Endereco } from "../types/Endereco";
import { ColetaService } from "../services/ColetaService";

function SchedulingLoggedOut() {
  const cepRegex = /^[0-9]{8}$/
  const navigate = useNavigate()
  const appContext = useContext(AppContext)
  const [formEndereco, setFormEndereco] = useState<EnderecoForm>({
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    referencia: ""
  })

  const [modalMaterialOpen, setModalMaterialOpen] = useState(false)
  const [modalDataOpen, setModalDataOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [materiaisAdicionados, setMateriaisAdicionados] = useState<any[]>([])

  const [form, setForm] = useState<CreateColetaForm>({
    enderecoId: 0,
    clienteNome: "",
    clienteCel: "",
    clienteTel: "",
    dataCadastro: new Date().toISOString(),
    dataDeColeta: "Selecionar",
    listaItensColeta: "",
    lat: 0,
    lon: 0,
    status: true
  })
  const [loadingCep, setLoadingCep] = useState(false)
  const [errorCep, setErrorCep] = useState(false)
  const [errorLogradouro, setErrorLogradouro] = useState(false)
  const [errorNumero, setErrorNumero] = useState(false)
  const [errorBairro, setErrorBairro] = useState(false)
  const [errorCidade, setErrorCidade] = useState(false)
  const [errorData, setErrorData] = useState(false)
  const [errorMaterial, setErrorMaterial] = useState(false)
  const [celularError, setCelularError] = useState(false)
  const [telefoneError, setTelefoneError] = useState(false)
  const [nomeError, setNomeError] = useState(false)
  const [serverError, setServerError] = useState(false)

  const validarCampos = () => {
    if (form.clienteNome == null || form.clienteNome == "" || form.clienteNome == undefined) {
      setNomeError(true)
      return false
    }

    if (form.clienteCel.length <= 10 || form.clienteCel == null || form.clienteCel == undefined) {
      setCelularError(true)
      return false
    }

    if (form.clienteTel != null && form.clienteTel != undefined && form.clienteTel.length < 10 && form.clienteTel.length > 0) {
      setTelefoneError(true)
      return false
    }

    if (formEndereco.cep == undefined || !cepRegex.test(formEndereco.cep)) {
      setErrorCep(true)
      return false
    }

    if (formEndereco.logradouro == null || formEndereco.logradouro == "" || formEndereco.logradouro == undefined) {
      setErrorLogradouro(true)
      return false
    }

    if (formEndereco.numero == null || formEndereco.numero == "" || formEndereco.numero == undefined) {
      setErrorNumero(true)
      return false
    }

    if (formEndereco.bairro == null || formEndereco.bairro == "" || formEndereco.bairro == undefined) {
      setErrorBairro(true)
      return false
    }

    if (formEndereco.cidade == null || formEndereco.cidade == "" || formEndereco.cidade == undefined) {
      setErrorCidade(true)
      return false
    }

    if (form.dataDeColeta == "Selecionar") {
      setErrorData(true)
      return false
    }
    if (materiaisAdicionados.length == 0) {
      setErrorMaterial(true)
      return false
    }

    return true
  }

  const ItemMaterial = (material: any, index: number) => {
    return (
      <div
        key={index}
        className=" bg-input-color w-full flex flex-col p-4 rounded-lg">
        <p className="">Material: {appContext.materiais.find(x => x.id == material.idMaterial)?.descricao}</p>
        <p className="">Peso: {material.peso}</p>
        <div className="flex gap-2 mt-4">
          <PrimaryButton color="red" title="Excluir" onClick={() => {
            let copia = [...materiaisAdicionados]
            copia.splice(index, 1)
            setMateriaisAdicionados(copia)
          }} />
        </div>
      </div>
    )
  }

  const style = tv(
    {
      slots: {
        enderecoContainer: "w-full max-h-64 border-[1px] border-solid rounded-md bg-input-color overflow-y-scroll",
        materialContainer: " bg-light-green border-[1px] rounded-xl w-full items-center justify-center flex py-6 max-w-[420px]"
      },
      variants: {
        errorEndereco: {
          true: {
            enderecoContainer: "border-red-500"
          },
          false: {
            enderecoContainer: "border-dark-green"
          }
        },
        errorMaterial: {
          true: {
            materialContainer: "border-red-500"
          },
          false: {
            materialContainer: "md:border-dark-green"
          }
        }

      }
    }
  )

  const handleSave = async () => {
    setLoading(true)
    await EnderecoService.cadastrarEndereco(formEndereco).then(async (r) => {
      let copyForm = { ...form }
      copyForm.enderecoId = r.data.successes[0].message
      let copyEnderecoForm = { ...formEndereco }
      copyEnderecoForm.id = r.data.successes[0].message

      let location = await GoogleService.buscarLatitudeLongitude(copyEnderecoForm as Endereco)
      if (location != "erro") {
        copyForm.lat = location.lat
        copyForm.lon = location.lng
      }
      let materiaisString: string = ""
      materiaisAdicionados.forEach(x => {
        materiaisString = materiaisString + `${x.idMaterial}:${x.peso};`
      })
      copyForm.listaItensColeta = materiaisString
      setForm(copyForm)
      setFormEndereco(copyEnderecoForm)
      await ColetaService.cadastrarColeta(copyForm).then(async (x) => {
        await appContext.resetUnavailableDates()
        appContext.useAlert("Agendamento de coleta realizado com sucesso! Para mais detalhes sobre seu agendamento entre em contato com a AMARIV pelo telefone (27)3317-3366.", () => { navigate("/") })
      }).catch(x => setServerError(true))

    }).catch(e => {
      setServerError(true)
    })
    setLoading(false)
  }


  return (
    <>
      <LoadingScreen open={loading} />
      <DatePicker
        unavailableDates={appContext.unavailableDates}
        value={dayjs(form.dataDeColeta)}
        isOpen={modalDataOpen}
        onAccept={(d) => {
          let copyForm = { ...form }
          if (d) {
            copyForm.dataDeColeta = d.toISOString()
            setForm(copyForm)
          }
          setModalDataOpen(false)
        }
        } onClose={() => setModalDataOpen(false)} />
      <AddMaterial
        isOpen={modalMaterialOpen}
        onCancel={() => { setModalMaterialOpen(false) }}
        onConfirm={(idMaterial, peso) => {
          let novoMaterial = {
            id: Math.random() * (20000 - 10000) + 10000,
            idMaterial: idMaterial,
            peso: peso
          }
          let copiaMateriais = [...materiaisAdicionados]
          copiaMateriais.unshift(novoMaterial)
          setMateriaisAdicionados(copiaMateriais)
          setModalMaterialOpen(false)
        }} />
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-r from-[#3f5745] to-primary-green lg:py-6">
        <div className="w-full min-h-screen flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
          <TopBar title="Novo agendamento" OnClickBack={() => { navigate("/login") }} />
          <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
            <p className="text-3xl font-bold text-primary-green mb-2 mt-8">Seus dados</p>
            <Input title="Nome" titleColor="dark" value={form.clienteNome}
              requiredField
              error={nomeError}
              errorMessage="Digite um nome"
              onChange={v => {
                setNomeError(false)
                let copiaForm = { ...form }
                copiaForm.clienteNome = v.target.value
                setForm(copiaForm)
              }} />
            <Input title="Celular" titleColor="dark" value={form.clienteCel} mask="(99)99999-9999"
              error={celularError}
              errorMessage="Digite um número de celular válido. Ex: (31)97575-7575"
              requiredField
              onChange={v => {
                setCelularError(false)
                let copiaForm = { ...form }
                copiaForm.clienteCel = v.target.value.replace(/\D/g, '')
                setForm(copiaForm)
              }} />
            <Input title="Celular/Telefone" titleColor="dark" value={form.clienteTel as string} mask={form.clienteTel ? (form.clienteTel?.length < 10 ? "(99)9999-9999" : "(99)99999-9999") : ""}
              error={telefoneError}
              errorMessage="Digite um número válido. Ex: (31)9999-9999"
              requiredField
              onChange={v => {
                setTelefoneError(false)
                let copiaForm = { ...form }
                copiaForm.clienteTel = v.target.value.replace(/\D/g, '')
                setForm(copiaForm)
              }} />
            <p className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereço</p>
            <Input title="CEP"
              titleColor="dark"
              mask="99999-999"
              requiredField
              value={formEndereco.cep}
              error={errorCep}
              rightLoading={loadingCep}
              errorMessage="Digite um CEP válido"
              onChange={v => {
                setErrorCep(false)
                let copiaForm = { ...formEndereco }
                copiaForm.cep = v.target.value.replace(/\D/g, '')
                setFormEndereco(copiaForm)
              }}
              onChangeDebounce={async (value) => {
                if (cepRegex.test(value) && value != "") {
                  setLoadingCep(true)
                  let result = await ViaCepService.buscarEndereco(value)

                  if (result.erro == null || result.erro == undefined) {
                    let copiaForm = { ...formEndereco }
                    copiaForm.logradouro = result.logradouro
                    copiaForm.bairro = result.bairro
                    copiaForm.cidade = result.localidade
                    setFormEndereco(copiaForm)
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
              value={formEndereco.logradouro}
              onChange={v => {
                setErrorLogradouro(false)
                let copiaForm = { ...formEndereco }
                copiaForm.logradouro = v.target.value
                setFormEndereco(copiaForm)
              }} />
            <Input title="Número"
              error={errorNumero}
              errorMessage="Digite um número"
              titleColor="dark"
              requiredField
              type="number"
              value={formEndereco.numero}
              onChange={v => {
                setErrorNumero(false)
                let copiaForm = { ...formEndereco }
                copiaForm.numero = v.target.value.replace(/\D/g, '')
                setFormEndereco(copiaForm)
              }} />
            <Input
              title="Bairro"
              error={errorBairro}
              errorMessage="Digite um bairro"
              titleColor="dark"
              requiredField
              value={formEndereco.bairro}
              onChange={v => {
                setErrorBairro(false)
                let copiaForm = { ...formEndereco }
                copiaForm.bairro = v.target.value
                setFormEndereco(copiaForm)
              }} />
            <Input
              title="Cidade"
              error={errorCidade}
              errorMessage="Digite uma cidade"
              titleColor="dark"
              requiredField
              value={formEndereco.cidade}
              onChange={v => {
                setErrorCidade(false)
                let copiaForm = { ...formEndereco }
                copiaForm.cidade = v.target.value
                setFormEndereco(copiaForm)
              }} />
            <Input
              title="Referência"
              titleColor="dark"
              onChange={v => {
                let copiaForm = { ...formEndereco }
                copiaForm.referencia = v.target.value
                setFormEndereco(copiaForm)
              }} />
            <p className="text-3xl font-bold text-primary-green mb-2 mt-6">Sobre a coleta</p>
            <SelectInput
              errorMessage="É necessário fornecer uma data para a coleta"
              error={errorData}
              onClickSelectableInput={() => {
                setErrorData(false)
                setModalDataOpen(true)
              }}
              calendarIcon
              value={form.dataDeColeta == "Selecionar" ? "Selecionar" : dataUtils.converterData(form.dataDeColeta)}
              title="Data da coleta" />
            <p className="text-3xl font-bold text-primary-green mb-2 mt-6">Materiais da coleta</p>
          </div>
          <div className="w-full items-center justify-center flex py-6 max-w-[420px] px-3 flex-col">
            <div className={style().materialContainer({ errorMaterial: errorMaterial })}>
              <div className="w-full flex flex-col gap-6 max-w-[420px] px-3">
                <div className="w-full flex justify-end">
                  <div className="w-2/3">
                    <PrimaryButton title="Adicionar material" leftIcon="IconCirclePlus"
                      onClick={() => {
                        setErrorMaterial(false)
                        setModalMaterialOpen(true)
                      }} />
                  </div>
                </div>
                {
                  materiaisAdicionados.length == 0 &&
                  <div className="flex flex-col gap-4 items-center justify-center p-8">
                    <img src={img} className="w-[30%]" />
                    <p className="font-light text-lg">{"Nenhum material adicionado..."}</p>
                  </div>
                }
                {
                  materiaisAdicionados.length > 0 &&
                  materiaisAdicionados.map((material, index) => ItemMaterial(material, index))
                }
              </div>
            </div>
            {
              errorMaterial &&
              <p className="text-sm text-red-500 mt-2">*É necessário informar pelo menos um material para a coleta. Clique no botão "Adicionar material" para registrar um novo</p>
            }
          </div>
          {
            serverError &&
            <div className="w-full mt-4 px-6 max-w-[420px]">
              <Alert severity="error">Erro ao comunicar com o servidor. Tente novamente mais tarde.</Alert>
            </div>
          }
          <div className="w-full flex items-center justify-center">
            <div className="w-2/3 mt-6 max-w-[250px] mb-16">
              <PrimaryButton title="Agendar coleta" leftIcon="IconCheck" onClick={() => {
                if (validarCampos()) {
                  handleSave()
                }
                else {
                  appContext.setMessageSnackBar("Preencha todos os campos obrigatórios")
                  appContext.setSnackBarOpen(true)
                }
              }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchedulingLoggedOut;