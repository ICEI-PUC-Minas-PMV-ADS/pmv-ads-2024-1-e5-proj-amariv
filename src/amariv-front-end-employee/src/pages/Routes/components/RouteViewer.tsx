/**
 * RouteViewer
 */

import { isDesktop } from "react-device-detect";

export function RouteViewer() {
  return (
    <div className="w-full bg-[#53735B] rounded">
      <div className="w-full p-3">
        <p className="text-lg text-white font-bold">
          José Ernesto
        </p>
        <p className="text-sm text-[#CADDA8] font-normal">
          Rua Professor Carlos de Souza, 2560,
          Vila José Gonçalves, Nova Cidade
        </p>
      </div>

      <div className="w-full flex flex-row border-t border-[#ffffff40]">
        <div className="flex-1 p-4 text-white font-normal">
          Celular: (00) 00000-0000
        </div>
        {!isDesktop &&
          <div className="py-4 px-[2rem] border-s border-[#ffffff30] text-[#CADDA8] font-bold">
            Ligar
          </div>}
      </div>

      <div className="w-full flex flex-row border-t border-b border-[#ffffff40]">
        <div className="flex-1 p-4 text-white font-normal">
          Telefone: (00) 00000-0000
        </div>
        {!isDesktop &&
          <div className="py-4 px-[2rem] border-s border-[#ffffff40] text-[#CADDA8] font-bold">
            Ligar
          </div>}
      </div>

      <div className="w-full p-3 text-white font-bold">
        Materiais: Plásticos (Leve), Latinhas (Leve),
        Papel (Leve)
      </div>

      <div className="w-full flex items-stretch flex-row border-t border-[#ffffff40] text-white font-bold">
        {!isDesktop && <div className="flex-1 text-[#CADDA8] text-xl font-bold flex justify-center items-center">
          <div className="py-4">Navegar</div>
        </div>}
        <div className="flex-1  text-xl text-[#CADDA8] font-bold flex justify-center items-center border-s border-[#ffffff40]">
          <div className="py-4">Finalizar</div>
        </div>
      </div>
    </div>
  );
}