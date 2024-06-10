import React from "react";
import { GatheringItinerary } from "src/models/GatheringItinerary";

/**
 * ReminderProps
 */

export type ReminderProps = {
  duration: number | null,
  gatheringItinerary: GatheringItinerary | null,
};


/**
 * Reminder
 */

export const Reminder = ({ duration, gatheringItinerary }: ReminderProps) => {
  const gatheringCount = React.useRef(gatheringItinerary?.coletas.reduce((prevValue, item) => {
    return prevValue + (item.status === false ? 1 : 0);
  }, 0));

  /**
   * Aux functions.
   */
  const getGatheringDesc = React.useCallback((gatheringCount: number): string => {
    return gatheringCount + " " + (gatheringCount > 1 ? "coletas" : "coleta");
  }, []);

  /**
   * Layout
   */

  return (
    <>
      {(gatheringItinerary !== null && duration !== null) &&
        <div className="w-full py-4 px-6 bg-[#CADDA8]">
          <div className="flex flex-row justify-between items-center">
            <p className="font-bold text-[1.15rem]">Novas rotas disponíveis!</p>
            <span className="px-[0.3rem] h-[1.1rem] bg-[#FF2727] text-white text-[.75rem] rounded-sm justify-center items-center">
              Aviso
            </span>
          </div>
          <p className="my-2 text-[.85rem]">
            Existem {getGatheringDesc(gatheringCount?.current ?? 0)} disponíveis para serem realizadas.
          </p>
          <p className="text-[.85rem]">
            <strong>Tempo estimado: {Math.ceil(duration * 1.6)}min</strong>
          </p>
        </div>}
    </>
  );
};