import TopBar from "./TopBar";
import { Modal } from "@mui/material";
import { tv } from "tailwind-variants";
import { DateConvert } from "../utils/DateConvert";

type props = {
  isOpen: boolean,
  onClose: () => void
  onConfirm: (date: string) => void
  availableHours: string[]
  value: string
}

function SelectHours({ isOpen, onClose, onConfirm, availableHours, value }: props) {

  const style = tv({
    slots: {
      fundo: "w-[80px] h-10 rounded-full flex items-center justify-center cursor-pointer",

    },
    variants: {
      selecionado: {
        true: {
          fundo: "text-white bg-primary-green"
        },
        false: {
          fundo: "text-primary-green border border-[1px] border-primary-green"
        }
      }
    }
  })

  return (
    <>
      <Modal open={isOpen} className=" overflow-y-scroll" onClose={onClose}>
        <div>
          <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6">
            <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
              <TopBar title="Horário da coleta" OnClickBack={onClose} />
              <div className="w-full flex gap-4 max-w-[420px] px-6 mt-8 mb-8 overflow-clip flex-wrap items-center justify-center">
                {
                  availableHours.map(x => (
                    <div key={x} onClick={() => onConfirm(x)} className={style().fundo({ selecionado: value == x })} >
                      <p>{DateConvert.getLocalHour(x)}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SelectHours;