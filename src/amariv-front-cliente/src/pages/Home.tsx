import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import PrimaryButton from "../components/PrimaryButton";
import { Coleta } from "../types/Coleta";
import { Chip } from "@mui/material";
import { coletaUtils } from "../utils/coletaUtils";
import { useContext } from "react";
import { AppContext } from "../contexts/AuthContext/AppContext";
import { DateConvert } from "../utils/DateConvert";
function Home() {

  const location = useLocation()
  const navigate = useNavigate()
  const appContext = useContext(AppContext)

  return (
    <div>
      <NavBar path={location.pathname} />
      <div className="w-full min-h-screen flex bg-light-backgroud items-center lg:items-start flex-col">
        <TopBar title="AMARIV" backButton={false} />
        <div>
        </div>
        <div className="w-full flex flex-col gap-2 px-6 items-center md:items-start mt-8 mb-2">
          <div className="w-full flex justify-between mb-6 items-center">
            <p className="text-2xl font-bold text-black">Lembrete</p>
            <div className="w-3/4 max-w-[235px] hidden md:block">
              <PrimaryButton title="Novo agendamento" leftIcon="IconCirclePlus" onClick={() => { navigate("/novoagendamento") }} />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-2 lg:max-w-[1220px] md:max-w-[810px]">
              <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] min-h-[148px] bg-secondary-green">
                {
                  appContext.coletasAberto.length > 0 &&
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="w-2/3 mb-2">
                        <Chip label="Coleta agendada" color="success" />
                      </div>
                      <p>Data da coleta: {DateConvert.getLocalDate(appContext.coletasAberto[0].dataDeColeta)}</p>
                      <p>Horário da coleta: {DateConvert.getLocalHour(appContext.coletasAberto[0].dataDeColeta)}</p>
                      <p>Materiais: {coletaUtils.stringMateriais(appContext.coletasAberto[0].listaItensColeta, appContext.materiais)}</p>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="w-1/2 mt-3">
                        <PrimaryButton color="red" title="Cancelar coleta" onClick={() => appContext.cancelarColeta(appContext.coletasAberto[0].id)} />
                      </div>
                    </div>
                  </div>
                }
                {
                  appContext.coletasAberto.length == 0 &&
                  <div className="w-full h-full items-center justify-center flex p-4">
                    <p className="text-center font-light">Você não tem nenhuma coleta pendente. Clique em <span className="font-medium">"Novo agendamento"</span> para agendar uma coleta.</p>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-2 md:hidden">
            <div className="w-3/4 max-w-[235px]">
              <PrimaryButton title="Novo agendamento" leftIcon="IconCirclePlus" onClick={() => { navigate("/novoagendamento") }} />
            </div>
          </div>
        </div>
        {
          appContext.coletasFinalizado.length > 0 &&
          <>
            <div className="w-full h-[0.3px] my-8 bg-[#B5C8BA] " />
            <div className="w-full flex flex-col gap-2 px-6 items-center mb-20">
              <div className="w-full flex justify-between mb-6 items-center">
                <p className="text-2xl font-bold text-black">Últimas coletas</p>
                <div className="w-2/3 max-w-[235px] hidden md:block">
                  <PrimaryButton title="Ver histórico completo" leftIcon="IconHistory" onClick={() => { navigate("/historico") }} />
                </div>
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-2 lg:max-w-[1220px] md:max-w-[810px]">
                {
                  appContext.coletasFinalizado.slice(0, 3).map((coleta) => (
                    <div
                      key={coleta.id}
                      className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black min-h-[148px]">
                      <div className="w-2/3 mb-2">
                        {
                          (coleta.isSuccess == false && coleta.cancelada == true) &&
                          <Chip label="Coleta cancelada" color="error" />
                        }
                        {
                          (coleta.isSuccess == true && coleta.cancelada == false) &&
                          <Chip label="Coleta finalizada" color="warning" />
                        }
                      </div>
                      <p>Data da coleta: {DateConvert.getLocalDate(coleta.dataDeColeta)}</p>
                      <p>Horário da coleta: {DateConvert.getLocalHour(coleta.dataDeColeta)}</p>
                      <p>Materiais: {coletaUtils.stringMateriais(coleta.listaItensColeta, appContext.materiais)}</p>
                      {
                        (coleta.status == false && coleta.isSuccess == false) &&
                        <p className="text-[12px] font-extralight mt-2">*Essa coleta foi cancelada, para mais detalhes entre em contato com a AMARIV pelo telefone (27) 3317-3366</p>
                      }
                    </div>
                  ))
                }
              </div>
              <div className="w-full flex justify-center mt-2 mb-14">
                <div className="w-3/4 max-w-[235px] md:hidden">
                  <PrimaryButton title="Ver histórico completo" leftIcon="IconHistory" onClick={() => { navigate("/historico") }} />
                </div>
              </div>
            </div>
          </>
        }
      </div>
    </div >
  );
}

export default Home;