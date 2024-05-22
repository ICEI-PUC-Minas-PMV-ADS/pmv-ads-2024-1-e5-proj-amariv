import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
function Home() {
  const location = useLocation()
  const navigate = useNavigate()


  return (
    <div>
      <NavBar path={location.pathname} />
      <div className="w-full min-h-screen flex bg-light-backgroud items-center lg:items-start flex-col">
        <TopBar title="AMARIV" backButton={false} />
        <div>
        </div>
        <div className="w-full flex flex-col gap-2 px-6 items-center md:items-start mt-8">
          <div className="w-full flex justify-between mb-6 items-center">
            <p className="text-2xl font-bold text-black">Lembrete</p>
            <div className="w-3/4 max-w-[235px] hidden md:block">
              <PrimaryButton title="Novo agendamento" leftIcon="IconCirclePlus" onClick={() => { navigate("/novoagendamento") }} />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-2 lg:max-w-[1220px] md:max-w-[810px]">
              <div className="w-full bg-secondary-green rounded-lg p-4 flex flex-col text-black max-w-[400px]">
                <p className="text-xl font-bold text-black mb-2 ">Coleta agendada</p>
                <p>Dia: 00/00/00</p>
                <p>Horário: 12:00</p>
                <p>Materiais: Ferro (pesado), Plastico (leve)</p>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-2 md:hidden">
            <div className="w-3/4 max-w-[235px]">
              <PrimaryButton title="Novo agendamento" leftIcon="IconCirclePlus" onClick={() => { navigate("/novoagendamento") }} />
            </div>
          </div>
        </div>
        <div className="w-full h-[0.3px] my-8 bg-[#B5C8BA] " />
        <div className="w-full flex flex-col gap-2 px-6 items-center mb-20">
          <div className="w-full flex justify-between mb-6 items-center">
            <p className="text-2xl font-bold text-black">Últimas coletas</p>
            <div className="w-2/3 max-w-[235px] hidden md:block">
              <PrimaryButton title="Ver histórico completo" leftIcon="IconHistory" onClick={() => { navigate("/historico") }} />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-2 lg:max-w-[1220px] md:max-w-[810px]">
            <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black">
              <p className="font-bold">Coleta finalizada</p>
              <p>Dia: 00/00/00</p>
              <p>Horário: 12:00</p>
              <p>Materiais: Ferro (pesado), Plastico (leve)</p>
            </div>
            <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black">
              <p className="font-bold">Coleta finalizada</p>
              <p>Dia: 00/00/00</p>
              <p>Horário: 12:00</p>
              <p>Materiais: Ferro (pesado), Plastico (leve)</p>
            </div>
            <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black">
              <p className="font-bold">Coleta finalizada</p>
              <p>Dia: 00/00/00</p>
              <p>Horário: 12:00</p>
              <p>Materiais: Ferro (pesado), Plastico (leve)</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2 mb-14">
            <div className="w-3/4 max-w-[235px] md:hidden">
              <PrimaryButton title="Ver histórico completo" leftIcon="IconHistory" onClick={() => { navigate("/historico") }} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Home;