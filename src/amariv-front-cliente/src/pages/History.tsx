import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import { useContext } from "react";
import { AppContext } from "../contexts/AuthContext/AppContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { coletaUtils } from "../utils/coletaUtils";
import { Chip, CircularProgress } from "@mui/material";
import img from "../assets/sem-dados.png"
import PrimaryButton from "../components/PrimaryButton";
import { DateConvert } from "../utils/DateConvert";

function History() {
  const location = useLocation()
  const appContext = useContext(AppContext)

  return (
    <div>
      <NavBar path={location.pathname} />
      <div className="w-full min-h-screen flex bg-light-backgroud items-center lg:items-start flex-col pb-20">
        <TopBar title="Histórico" backButton={false} />
        {
          appContext.coletasAberto.length > 0 &&
          <div className="w-full flex flex-col gap-2 px-6 items-center mt-8">
            <div className="w-full flex justify-between mb-6 items-center">
              <p className="text-2xl font-bold text-black">Coletas em aberto</p>
            </div>
            <div className="w-full lg:max-w-[1220px] md:max-w-[810px] mb-12">
              <InfiniteScroll
                dataLength={appContext.coletasAberto.length}
                next={appContext.fetchMoreColetasAberto}
                hasMore={appContext.pageNumberColetasAberto < appContext.totalPagesColetasAberto}
                loader={
                  <div className="w-full flex items-center justify-center mt-6">
                    <CircularProgress
                      size={40}
                      sx={
                        {
                          color: "#53735B"
                        }
                      } />
                  </div>
                }
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2"
                scrollableTarget="scrollableDiv"
              >
                {appContext.coletasAberto.map((coleta) => (
                  <div key={coleta.id}
                    className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black min-h-[148px] justify-between">
                    <div>
                      <div className="w-2/3 mb-2">
                        <Chip label="Coleta agendada" color="success" />
                      </div>
                      <p>Data da coleta: {DateConvert.getLocalDate(coleta.dataDeColeta)}</p>
                      <p>Horário da coleta: {DateConvert.getLocalHour(coleta.dataDeColeta)}</p>
                      <p>Materiais: {coletaUtils.stringMateriais(coleta.listaItensColeta, appContext.materiais)}</p>
                    </div>
                    <div className="w-full flex justify-end">
                      <div className="w-1/2 mt-3">
                        <PrimaryButton color="red" title="Cancelar coleta" onClick={() => appContext.cancelarColeta(coleta.id)} />
                      </div>
                    </div>
                  </div>
                ))}
              </InfiniteScroll>
            </div>
          </div>
        }
        {
          (appContext.coletasFinalizado.length > 0 && appContext.coletasAberto.length > 0) &&
          <div className="w-full h-[0.3px] my-8 bg-[#B5C8BA] " />
        }
        {
          appContext.coletasFinalizado.length > 0 &&
          <div className="w-full flex flex-col gap-2 px-6 items-center mt-8 mb-6">
            <div className="w-full flex justify-between mb-6 items-center">
              <p className="text-2xl font-bold text-black">Coletas finalizadas</p>
            </div>
            <div className="w-full lg:max-w-[1220px] md:max-w-[810px] mb-20">
              <InfiniteScroll
                dataLength={appContext.coletasFinalizado.length}
                next={appContext.fetchMoreColetasFinalizado}
                hasMore={appContext.pageNumberColetasFinalizado < appContext.totalPagesColetasFinalizado}
                loader={
                  <div className="w-full flex items-center justify-center mt-6">
                    <CircularProgress
                      size={40}
                      sx={
                        {
                          color: "#53735B"
                        }
                      } />
                  </div>
                }
                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2"
                scrollableTarget="scrollableDiv"
              >
                {appContext.coletasFinalizado.map((coleta) => (
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
                ))}
              </InfiniteScroll>
            </div>
          </div>
        }
        {
          (appContext.coletasAberto.length == 0 && appContext.coletasFinalizado.length == 0) &&
          <div className="w-full flex items-center justify-center mt-32">
            <div className="p-8 text-center flex items-center flex-col justify-center">
              <img src={img} className="w-1/3 mb-2 max-w-[150px]" />
              <p className="text-lg">Você ainda não realizou nenhum agendamento de coleta.</p>
              <p className=" font-extralight text-[14px]">Clique em "Agendamento" na barra de navegação para criar um novo agendamento de coleta.</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default History;