import React from "react";
import IcHandle from './../assets/ic_handle.svg';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReadColetaDto } from "../../../models/ColetaDtos/ReadColetaDto";
import { DateConvert } from "../../../utils/DateConvert";


/**
 * NextRouteItemProps
 */
export type NextRouteItemProps = {
  route: ReadColetaDto,
  position: number,
  onClickItem: (item: ReadColetaDto) => void,
};


/**
 * NextRouteItem
 */

export function NextRouteItem({ route, onClickItem }: NextRouteItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id: route.id! });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  };

  /**
   * Aux functions
   */

  const formatDate = React.useCallback((date: Date | undefined): string => {
    if (date) {
      return DateConvert.getIsoHour(date);
    }
    return "";
  }, []);

  /**
   * Layout
   */

  return (
    <div ref={setNodeRef} className="w-full bg-[#E8F4EB] py-2 border-b border-[#00000040]" style={style}>
      <div
        ref={setActivatorNodeRef}
        className="flex flex-col"
        {...attributes}
        {...listeners}>

        {/*
          Informação
        */}

        <div className="flex flex-row justify-center items-center" >
          <div className="text-2xl px-4 font-bold">
            {route.posicaoLista !== null ? `${route.posicaoLista}º` : '--'}
          </div>
          <div className="w-full flex flex-row flex-1">

            <div className="w-full flex flex-col flex-1">
              <div className="w-full h-[2rem] flex items-end">
                <p className="w-full text-sm line-clamp-1 flex flex-row">
                  <strong>{route.clienteNome}&nbsp;</strong>
                  {(route.isSuccess === true) && <span className="text-green-600">(coletada)</span>}
                  {(route.cancelada === true) && <span className="text-red-600">(cancelada)</span>}
                </p>
              </div>
              <div className="w-full h-[2rem] flex items-end">
                <p className="w-full text-sm line-clamp-2">
                  {route.endereco.logradouro}
                </p>
              </div>
              <div className="w-full h-[3rem] flex items-start">
                <p className="w-full line-clamp-2">
                  <strong>Materiais:</strong> {route.listaItensColeta}
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col flex-1 items-center justify-center">
              <p className="line-clamp-1">
                <strong>Horário de coleta</strong>
              </p>
              <p className="line-clamp-1">
                {formatDate(route.dataDeColeta)}
              </p>
            </div>

          </div>
          <div className="flex px-4 py-3">
            <img
              src={IcHandle}
              alt="Handle icon"
              style={{ width: 25, height: 30 }}
              onClick={() => onClickItem(route)} />
          </div>
        </div>
      </div>
    </div>
  );
}