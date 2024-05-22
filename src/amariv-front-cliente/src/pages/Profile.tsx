import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import Input from "../components/Inputs/Input";
import PrimaryButton from "../components/PrimaryButton";
import img from "../assets/sem-dados.png"
import { tv } from "tailwind-variants";
import DynamicIcon from "../components/DynamicIcon";

function Profile() {
  const location = useLocation()

  const enderecos: any[] = [
    {
      id: 1,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 2,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 3,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    },
    {
      id: 4,
      logradouro: "Rua ali",
      numero: 1000,
      bairro: "Vila",
      cidade: "BH",
      estado: "MG",
      complemento: ""
    }
  ]

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
      <div className={fundo({ bordaAtiva: index != enderecos.length - 1 })}>

        <div>
          <p>{endereco.logradouro}, {endereco.numero}</p>
          <p>{endereco.bairro}</p>
          <p>{endereco.cidade}</p>
        </div>
        <DynamicIcon iconName="IconEdit" size={25} className="text-dark-green" />
      </div>
    )
  }

  return (
    <div>
      <NavBar path={location.pathname} />
      <TopBar title="Meu perfil" backButton={false} />
      <div className="w-full min-h-screen flex items-center justify-center lg:py-6 bg-light-backgroud">
        <div className="w-full flex bg-light-backgroud lg:bg-light-green items-center flex-col lg:w-[550px] lg:rounded-2xl lg:mt-4 mb-20">
          <div className="w-full flex flex-col gap-2 max-w-[420px] px-6">
            <text className="text-3xl font-bold text-primary-green mb-2 mt-8">Joao Lucas</text>
            <div>
              <p>Celular: (31)90000-0000</p>
              <p>Telefone: (31)90000-0000</p>
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Editar dados" />
            </div>
            <text className="text-3xl font-bold text-primary-green mb-2 mt-6">Endereços</text>
            <div className="w-full h-64 border-[1px] border-solid border-dark-green rounded-md bg-input-color overflow-y-scroll">
              {
                enderecos.map((e, index) => ItemEndereco(e, index))
              }
            </div>
            <div className="w-1/2 self-end mt-2">
              <PrimaryButton color="secondary" title="Novo endereço" />
            </div>
            <div className="w-full flex items-center justify-center mt-8 lg:mt-16">
              <div className="w-full mb-16">
                <PrimaryButton title="Sair" leftIcon="IconLogout" color="red" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;