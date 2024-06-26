import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import img from "../assets/sem-dados.png"
import { tv } from "tailwind-variants";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AuthContext/AppContext";
import CreateEndereco from "../components/CreateEndereco";
import UpdateUsuario from "../components/UpdateUsuario";

function Profile() {
  const location = useLocation()
  const appContext = useContext(AppContext)
  const navigate = useNavigate()
  const [modalEnderecoOpen, setModalEnderecoOpen] = useState(false)
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false)



  const ItemEndereco = (endereco: any, index: number) => {
    let style = tv(
      {
        slots: {
          fundo: "px-4 py-2 text-sm flex flex-row justify-between items-center gap-4"
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
      <div className={fundo({ bordaAtiva: index != appContext.enderecos.length - 1 })} key={index}>
        <div>
          <p>{endereco.logradouro}, {endereco.numero}</p>
          <p>{endereco.bairro}</p>
          <p>{endereco.cidade}</p>
        </div>
        {/* <DynamicIcon iconName="IconEdit" size={25} className="text-dark-green" /> */}
      </div>
    )
  }

  return (
    <div>
      <UpdateUsuario isOpen={modalUsuarioOpen} onClose={() => { setModalUsuarioOpen(false) }} />
      <CreateEndereco isOpen={modalEnderecoOpen} onClose={() => { setModalEnderecoOpen(false) }} />
      <NavBar path={location.pathname} />
      <TopBar title="Meu perfil" backButton={false} />
      <div className="w-full min-h-screen flex md:items-center justify-center lg:py-6 bg-light-backgroud">
        <div className="w-full flex bg-light-backgroud lg:bg-light-green items-center flex-col lg:w-[550px] lg:rounded-2xl lg:mt-4 mb-20">
          <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
            <p className="text-3xl font-bold text-primary-green mt-8">{appContext.user?.nome}</p>
            <div className="font-semibold">
              <p>Celular: {appContext.user?.celular ? appContext.user?.celular : "Não informado"}</p>
              {
                appContext.user?.telefone &&
                <p>Telefone: {appContext.user?.telefone}</p>
              }
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Editar dados" leftIcon="IconEdit" onClick={() => setModalUsuarioOpen(true)} />
            </div>
            <p className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereços</p>
            <div className="w-full max-h-64 border-[1px] border-solid border-dark-green rounded-md bg-input-color overflow-y-scroll">
              {
                appContext.enderecos.map((e, index) => ItemEndereco(e, index))
              }
              {
                appContext.enderecos.length == 0 &&
                <div className=" flex flex-col items-center justify-center p-8 text-center">
                  <img src={img} className="w-1/3 mb-2" />
                  <p className="text-lg">Nenhum endereco cadastrado</p>
                  <p className=" font-extralight text-[14px]">Clique em "Novo endereço" para cadastrar um novo endereço</p>
                </div>
              }
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Novo endereço" onClick={() => setModalEnderecoOpen(true)} leftIcon="IconCirclePlus" />
            </div>
            <div className="w-full flex items-center justify-center mt-8 lg:mt-16">
              <div className="w-full mb-16">
                <PrimaryButton title="Sair" leftIcon="IconLogout" color="red" onClick={async () => {
                  let result = await appContext.logout()
                  if (result) {
                    navigate("/")
                  }
                }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;