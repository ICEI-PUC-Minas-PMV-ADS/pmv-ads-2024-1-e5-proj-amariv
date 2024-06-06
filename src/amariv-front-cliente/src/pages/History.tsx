import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import TopBar from "../components/TopBar";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";

function History() {
  const location = useLocation()
  const authContext = useContext(AuthContext)

  return (
    <div>
      <NavBar path={location.pathname} />
      <div className="w-full min-h-screen flex bg-light-backgroud items-center lg:items-start flex-col">
        <TopBar title="Histórico" backButton={false} />
        <div>
        </div>
        <div className="w-full flex flex-col gap-2 px-6 items-center mt-8 mb-6">
          <div className="w-full flex justify-between mb-6 items-center">
            <p className="text-2xl font-bold text-black">Coletas em aberto</p>
          </div>
          <div className="w-full lg:max-w-[1220px] md:max-w-[810px]">
            <InfiniteScroll
              dataLength={authContext.coletas.length}
              next={authContext.fetchMoreColetas}
              hasMore={authContext.pageNumberColetas < authContext.totalPagesColetas}
              loader={<h4>Loading...</h4>}
              className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2"
              scrollableTarget="scrollableDiv"
            >
              {authContext.coletas.map((coleta) => (
                <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black">
                  <p className="font-bold">Coleta agendada</p>
                  <p>Dia: 00/00/00</p>
                  <p>Horário: 12:00</p>
                  <p>Materiais: Ferro (pesado), Plastico (leve)</p>
                </div>
              ))}
            </InfiniteScroll>
          </div>


        </div>
        <div className="w-full h-[0.3px] my-8 bg-[#B5C8BA] " />
        <div className="w-full flex flex-col gap-2 px-6 items-center mb-24 lg:mb-16">
          <div className="w-full flex justify-between mb-6 items-center">
            <p className="text-2xl font-bold text-black">Coletas finalizadas</p>
            <div className="w-2/3 max-w-[235px] hidden md:block">
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
            <div className="w-full rounded-lg p-4 flex flex-col text-black max-w-[400px] border-2 border-black">
              <p className="font-bold">Coleta finalizada</p>
              <p>Dia: 00/00/00</p>
              <p>Horário: 12:00</p>
              <p>Materiais: Ferro (pesado), Plastico (leve)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;