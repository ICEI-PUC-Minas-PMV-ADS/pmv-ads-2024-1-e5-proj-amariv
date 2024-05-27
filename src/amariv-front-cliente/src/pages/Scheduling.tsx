import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Input from "../components/Inputs/Input";
import PrimaryButton from "../components/PrimaryButton";
import img from "../assets/sem-dados.png"
import { tv } from "tailwind-variants";
import DynamicIcon from "../components/DynamicIcon";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import CreateEndereco from "../components/CreateEndereco";
import { MaterialService } from "../services/MaterialService";
import AddMaterial from "../components/AddMaterial";
import { Material } from "../types/Material";

function Scheduling() {
  const location = useLocation()
  const authContext = useContext(AuthContext)
  const [modalEnderecoOpen, setModalEnderecoOpen] = useState(false)

  const [modalMaterialOpen, setModalMaterialOpen] = useState(false)

  const [materiaisAdicionados, setMateriaisAdicionados] = useState<any[]>([])



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

  const ItemEndereco = (endereco: any, index: number) => {
    let style = tv(
      {
        slots: {
          fundo: "px-4 py-2 text-sm flex items-center gap-4 cursor-pointer"
        },
        variants: {
          bordaAtiva: {
            true: {
              fundo: "border-b-[1px] border-dark-green"
            },
            false: {
              fundo: ""
            }
          }

        }
      }
    )

    const { fundo } = style()

    return (
      <div className={fundo({ bordaAtiva: index != authContext.enderecos.length - 1 })}>
        <DynamicIcon iconName="IconCircle" size={20} className="text-dark-green" />
        <div>
          <p>{endereco.logradouro}, {endereco.numero}</p>
          <p>{endereco.bairro}</p>
          <p>{endereco.cidade}</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <CreateEndereco isOpen={modalEnderecoOpen} onClose={() => { setModalEnderecoOpen(false) }} />
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
              <text className="text-3xl font-bold text-primary-green mb-2 mt-8">Seus dados</text>
              <div>
                <p>Nome: {authContext.user?.nome}</p>
                <p>Celular: {authContext.user?.celular}</p>
                {
                  authContext.user?.telefone &&
                  <p>Telefone: {authContext.user?.telefone}</p>
                }
              </div>
              <div className="w-1/2 self-end mt-2">
                <PrimaryButton color="secondary" title="Editar dados" />
              </div>
              <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereço</text>
              <div className="w-full max-h-64 border-[1px] border-solid border-dark-green rounded-md bg-input-color overflow-y-scroll">
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
              <div className="w-1/2 self-end mt-2">
                <PrimaryButton color="secondary" title="Novo endereço" onClick={() => setModalEnderecoOpen(true)} />
              </div>
              <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Materiais da coleta</text>
            </div>
            <div className="w-full items-center justify-center flex py-6 max-w-[420px] px-3">
              <div className=" bg-light-green md:border-[1px] border-dark-green rounded-xl w-full items-center justify-center flex py-6 max-w-[420px]">
                <div className="w-full flex flex-col gap-6 max-w-[420px] px-3">
                  <Input title="Descrição geral dos materiais" titleColor="dark" requiredField />
                  <div className="w-full flex justify-end">
                    <div className="w-2/3">
                      <PrimaryButton title="Adicionar material" leftIcon="IconCirclePlus" onClick={() => { setModalMaterialOpen(true) }} />
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
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                <PrimaryButton title="Agendar coleta" leftIcon="IconCheck" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scheduling;