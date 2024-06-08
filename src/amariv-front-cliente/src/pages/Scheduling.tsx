import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Input from "../components/Inputs/Input";
import PrimaryButton from "../components/PrimaryButton";
import img from "../assets/sem-dados.png"
import { tv } from "tailwind-variants";
import DynamicIcon from "../components/DynamicIcon";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AuthContext/AppContext";
import CreateEndereco from "../components/CreateEndereco";
import AddMaterial from "../components/AddMaterial";
import UpdateUsuario from "../components/UpdateUsuario";
import { UpdateUsuarioForm } from "../types/UpdateUsuarioForm";
import { CreateColetaForm } from "../types/CreateColetaForm";
import { Endereco } from "../types/Endereco";
import SelectInput from "../components/Inputs/SelectInput";
import DatePicker from "../components/DatePicker";
import dataUtils from "../utils/dataUtils";
import dayjs from "dayjs";
import { Alert, Snackbar } from "@mui/material";
import { GoogleService } from "../services/GoogleService";
import LoadingScreen from "../components/LoadingScreen";
import { ColetaService } from "../services/ColetaService";

function Scheduling() {
  const location = useLocation()
  const navigate = useNavigate()
  const authContext = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(false)

  const [modalEnderecoOpen, setModalEnderecoOpen] = useState(false)
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false)
  const [modalMaterialOpen, setModalMaterialOpen] = useState(false)
  const [modalDataOpen, setModalDataOpen] = useState(false)

  const [materiaisAdicionados, setMateriaisAdicionados] = useState<any[]>([])

  const [errorData, setErrorData] = useState(false)
  const [errorMaterial, setErrorMaterial] = useState(false)
  const [errorEndereco, setErrorEndereco] = useState(false)

  const [form, setForm] = useState<CreateColetaForm>({
    userId: authContext.user?.id as string,
    enderecoId: authContext.enderecos.length == 0 ? 0 : authContext.enderecos[0].id,
    clienteNome: authContext.user?.nome as string,
    clienteCel: authContext.user?.celular as string,
    clienteTel: authContext.user?.telefone ? authContext.user?.telefone : null,
    dataCadastro: new Date().toISOString(),
    dataDeColeta: "Selecionar",
    listaItensColeta: "",
    lat: 0,
    lon: 0,
    status: true
  })


  const validarCampos = () => {
    if (form.enderecoId == 0) {
      setErrorEndereco(true)
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
      <div className=" bg-input-color w-full flex flex-col p-4 rounded-lg">
        <p className="">Material: {authContext.materiais.find(x => x.id == material.idMaterial)?.descricao}</p>
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

  const ItemEndereco = (endereco: Endereco, index: number) => {
    const { fundo } = style()
    return (
      <div
        key={index}
        className={fundo({ bordaAtiva: index != authContext.enderecos.length - 1 })}
        onClick={async () => {
          setErrorEndereco(false)
          let copia = { ...form }
          copia.enderecoId = endereco.id
          setForm(copia)
        }}>
        <DynamicIcon iconName={form.enderecoId == endereco.id ? "IconCircleCheck" : "IconCircle"} size={20} className="text-dark-green" />
        <div>
          <p>{endereco.logradouro}, {endereco.numero}</p>
          <p>{endereco.bairro}</p>
          <p>{endereco.cidade}</p>
        </div>
      </div>
    )
  }

  const style = tv(
    {
      slots: {
        fundo: "px-4 py-2 text-sm flex items-center gap-4 cursor-pointer",
        enderecoContainer: "w-full max-h-64 border-[1px] border-solid rounded-md bg-input-color overflow-y-scroll",
        materialContainer: " bg-light-green border-[1px] rounded-xl w-full items-center justify-center flex py-6 max-w-[420px]"
      },
      variants: {
        bordaAtiva: {
          true: {
            fundo: "border-b-[1px] border-dark-green"
          },
          false: {
            fundo: ""
          }
        },
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
    let endereco = authContext.enderecos.find(x => x.id == form.enderecoId)
    let location = await GoogleService.buscarLatitudeLongitude(endereco as Endereco)
    let copyForm = { ...form }
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
    await ColetaService.cadastrarColeta(copyForm).then(async (x) => {
      await authContext.resetColetasFinalizado()
      await authContext.resetColetasAberto()
      authContext.setMessageSnackBar("Agendamento de coleta realizado com sucesso!")
      authContext.setSnackBarOpen(true)
      navigate("/")
    }).catch(x => setServerError(true))
    setLoading(false)
  }


  return (
    <>
      <LoadingScreen open={loading} />
      <DatePicker
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
      <UpdateUsuario isOpen={modalUsuarioOpen} onClose={() => { setModalUsuarioOpen(false) }} />
      <CreateEndereco isOpen={modalEnderecoOpen}
        onConfirm={(id) => {
          let copia = { ...form }
          copia.enderecoId = id
          setForm(copia)
        }}
        onClose={() => {
          setModalEnderecoOpen(false)
        }} />
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
      <div>
        <NavBar path={location.pathname} />
        <TopBar title="Novo agendamento" backButton={false} />
        <div className="w-full min-h-screen flex items-center justify-center lg:py-6 bg-light-backgroud">
          <div className="w-full min-h-screen flex bg-light-backgroud lg:bg-light-green items-center flex-col lg:w-[550px] lg:rounded-2xl lg:mt-4 mb-20">
            <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
              <p className="text-3xl font-bold text-primary-green mb-2 mt-8">Seus dados</p>
              <div>
                <p>Nome: {authContext.user?.nome}</p>
                <p>Celular: {authContext.user?.celular}</p>
                {
                  authContext.user?.telefone &&
                  <p>Telefone: {authContext.user?.telefone}</p>
                }
              </div>
              <div className="w-1/2 self-end mt-2">
                <PrimaryButton color="secondary" title="Editar dados" onClick={() => setModalUsuarioOpen(true)} />
              </div>
              <p className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereço</p>
              <div className={style().enderecoContainer({ errorEndereco: errorEndereco })}>
                {
                  authContext.enderecos.map((e, index) => ItemEndereco(e, index))
                }
                {
                  authContext.enderecos.length == 0 &&
                  <div className=" flex flex-col items-center justify-center p-8 text-center">
                    <img src={img} className="w-1/3 mb-2" />
                    <p className="text-lg">Nenhum endereco cadastrado</p>
                    <p className=" font-extralight text-[14px]">Clique em "Novo endereço" para cadastrar um novo endereço</p>
                  </div>
                }
              </div>
              {
                errorEndereco &&
                <p className="text-sm text-red-500">*É necessário fornecer um endereço. Clique no botão "Novo Endereço" para registrar um novo</p>
              }
              <div className="w-1/2 self-end mt-2">
                <PrimaryButton color="secondary" title="Novo endereço" onClick={() => setModalEnderecoOpen(true)} />
              </div>
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
                    authContext.setMessageSnackBar("Preencha todos os campos obrigatórios")
                    authContext.setSnackBarOpen(true)
                  }
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scheduling;