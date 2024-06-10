import Input from "./Inputs/Input";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { useContext, useState } from "react";
import { EnderecoForm } from "../types/EnderecoForm";
import { ViaCepService } from "../services/ViaCepService";
import { AppContext } from "../contexts/AuthContext/AppContext";
import { EnderecoService } from "../services/EnderecoService";
import LoadingScreen from "./LoadingScreen";
import { Alert, Modal } from "@mui/material";
import SelectInput from "./Inputs/SelectInput";
import { tv } from "tailwind-variants";
import DynamicIcon from "./DynamicIcon";

type props = {
  title?: string
  isOpen: boolean,
  onConfirmSelection: (item: any) => void
  onCancelSelection: () => void
  itens: any[]
  labelField: string
  valueField: string
  value?: string | null | number
}


function SelectModal({ isOpen, onConfirmSelection, onCancelSelection, itens, labelField, value, valueField, title = "Selecionar" }: props) {

  const ItemLista = (item: any, index: number) => {
    let style = tv(
      {
        slots: {
          fundo: "px-4 py-4 text-sm flex items-center gap-4 cursor-pointer"
        },
        variants: {
          bordaAtiva: {
            true: {
              fundo: "border-b-[1px] border-dark-green"
            },
            false: {
              fundo: ""
            }
          }

        }
      }
    )

    const { fundo } = style()

    return (
      <div key={Math.random() * (20000 - 10000) + 10000} className={fundo({ bordaAtiva: index != itens.length - 1 })} onClick={() => {
        if (onConfirmSelection)
          onConfirmSelection(item)
      }}>
        <DynamicIcon iconName={item[valueField] == value ? "IconCircleCheck" : "IconCircle"} size={20} className="text-dark-green" />
        <div>
          <p>{item[labelField]}</p>
        </div>
      </div>
    )
  }

  return (
    <Modal open={isOpen} className=" overflow-y-scroll" onClose={onCancelSelection}>
      <div>
        <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6">
          <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
            <TopBar title={title} OnClickBack={onCancelSelection} />
            <div className="w-full flex flex-col gap-2 px-4 py-6">
              {itens.map((item, index) => ItemLista(item, index))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SelectModal;