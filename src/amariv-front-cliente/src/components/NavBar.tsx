import DynamicIcon from "./DynamicIcon";
import logo from "../assets/amariv.png"
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router-dom";

function NavBar({ path }: { path: string }) {
  const navigate = useNavigate()

  const tab = tv({
    slots: {
      containerItem: "flex flex-col text-white font-semibold items-center hover:text-secondary-green cursor-pointer gap-1 lg:min-w-20 justify-between"
    },
    variants: {
      active: {
        true: {
          containerItem: "text-secondary-green"
        }
      }
    }
  })
  const { containerItem } = tab()


  return (
    <div className="h-[70px] w-full fixed z-10 flex py-3 px-4 items-center justify-between bg-primary-green bottom-0 lg:bottom-auto" >
      <div className="hidden lg:block">
        <img src={logo} className="w-[70px]" />
      </div>
      <div className="w-full flex gap-4 items-center text-[12px] h-full justify-around lg:justify-end">
        <div className={containerItem({ active: path == "/home" })} onClick={() => { navigate("/home") }}>
          <DynamicIcon iconName="IconHome" size={30} />
          <p>Início</p>
        </div>
        <div className={containerItem({ active: path == "/novoagendamento" })} onClick={() => { navigate("/novoagendamento") }}>
          <DynamicIcon iconName="IconCirclePlus" size={30} />
          <p className="text-center leading-3">Agendamento</p>
        </div>
        <div className={containerItem({ active: path == "/historico" })} onClick={() => { navigate("/historico") }}>
          <DynamicIcon iconName="IconHistory" size={30} />
          <p>Histórico</p>
        </div>
        <div className={containerItem({ active: path == "/perfil" })} onClick={() => { navigate("/perfil") }}>
          <DynamicIcon iconName="IconUserCircle" size={30} />
          <p>Meu perfil</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;