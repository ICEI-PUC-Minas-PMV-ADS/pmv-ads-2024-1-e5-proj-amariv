import React from "react";
import { GatheringItinerary } from "src/models/GatheringItinerary";
import { QueryUtils } from "src/utils/QueryUtils";

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

  /**
   * Aux functions.
   */
  const getGatheringDesc = React.useCallback((): string => {
    if (gatheringItinerary) {
      const gatheringCount = QueryUtils.getPendentGatheringsFromItinerary(gatheringItinerary).length;
      if (gatheringCount) {
        return gatheringCount + " " + (gatheringCount > 1 ? "coletas" : "coleta");
      }
    }
    return "0";
  }, [gatheringItinerary]);

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
            Existem {getGatheringDesc()} disponíveis para serem realizadas.
          </p>
          <p className="text-[.85rem]">
            {/* <strong>Tempo estimado: {Math.ceil(duration * 1.6)}min</strong> */}
          </p>
        </div>}
    </>
  );
};