import PrimaryButton from "./PrimaryButton";
import TopBar from "./TopBar";
import { useContext, useEffect, useState } from "react";
import {  Modal } from "@mui/material";
import SelectInput from "./Inputs/SelectInput";
import SelectModal from "./SelectModal";
import { Material } from "../../types/Material";
import React from "react";

type props = {
  materiais: any[],
  isOpen: boolean,
  onCancel: () => void
  onConfirm: (idMaterial: number, peso: string) => void 
}

function AddMaterial({ materiais, isOpen, onCancel, onConfirm }: props) {

  const pesos = React.useRef([
    {
      id: 1,
      descricao: "Leve"
    },
    {
      id: 2,
      descricao: "Médio"
    },
    {
      id: 3,
      descricao: "Pesado"
    }]
  );

  const [modalMaterialOpen, setModalMaterialOpen] = useState(false)
  const [modalPesoOpen, setModalPesoOpen] = useState(false)

  const [idMaterialSelected, setIdMaterialSelected] = useState(0)
  const [idPesoSelected, setIdPesoSelected] = useState(0)

  const [erroMaterial, setErroMaterial] = useState(false)
  const [erroPeso, setErroPeso] = useState(false)

  const validarCampos = () => {
    if (idMaterialSelected == 0) {
      setErroMaterial(true)
      return false
    }

    if (idPesoSelected == 0) {
      setErroPeso(true)
      return false
    }
    return true
  }


  return (
    <>
      <SelectModal
        title="Selecionar material"
        itens={materiais}
        labelField="descricao"
        isOpen={modalMaterialOpen}
        onConfirmSelection={(item: Material) => {
          setIdMaterialSelected(item.id)
          setModalMaterialOpen(false)
        }}
        onCancelSelection={() => setModalMaterialOpen(false)}
        valueField="id"
        value={idMaterialSelected} />
      <SelectModal
        title="Selecionar peso"
        itens={pesos.current}
        labelField="descricao"
        isOpen={modalPesoOpen}
        onConfirmSelection={(item: any) => {
          setIdPesoSelected(item.id)
          setModalPesoOpen(false)
        }}
        onCancelSelection={() => setModalPesoOpen(false)}
        valueField="id"
        value={idPesoSelected} />
      <Modal open={isOpen} className=" overflow-y-scroll" onClose={onCancel}>
        <div>
          <div className="w-full min-h-screen flex items-center justify-center bg-[rgb(0,0,0,0.4)] lg:py-6">
            <div className="w-full min-h-screen lg:min-h-fit flex bg-light-backgroud items-center flex-col lg:w-[550px] lg:rounded-2xl ">
              <TopBar title="Adicionar material" OnClickBack={onCancel} />
              <div className="w-full flex flex-col gap-2 max-w-[420px] px-6 mt-8 mb-2">
                <SelectInput
                  title="Material"
                  value={materiais.find(x => x.id == idMaterialSelected) ? materiais.find(x => x.id == idMaterialSelected)?.descricao : "Selecionar"}
                  requiredField
                  error={erroMaterial}
                  errorMessage="Selecione um material"
                  onClickSelectableInput={() => {
                    setErroMaterial(false)
                    setModalMaterialOpen(true)
                  }} />
                <SelectInput
                  error={erroPeso}
                  errorMessage="Selecione o peso do material"
                  title="Peso"
                  value={pesos.current.find(x => x.id == idPesoSelected) ? pesos.current.find(x => x.id == idPesoSelected)?.descricao : "Selecionar"}
                  requiredField
                  onClickSelectableInput={() => {
                    setErroPeso(false)
                    setModalPesoOpen(true)
                  }} />
              </div>
              <div className="w-full flex items-center justify-center">
                <div className="w-2/3 mt-6 max-w-[250px] mb-16">
                  <PrimaryButton title="Adicionar material" leftIcon="IconCheck" onClick={() => {
                    if (validarCampos()) {
                      onConfirm(idMaterialSelected, pesos.current.find(x => x.id == idPesoSelected)!.descricao)
                      setIdMaterialSelected(0)
                      setIdPesoSelected(0)
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddMaterial;