import { useState } from "react";
import { Button2 } from "../../../components/Button2";
import DropdownInput from "../../../components/DropdownInput";
import { materialService } from "../../../services/MaterialService";
import React from "react";
import DropdownCombo from "../../../components/DropdownCombo";


function recuperaInfoMaterial(callback: (items: any[]) => void) {
  const materiais = materialService.recuperaMateriais()
  const ddlMateriais = [{ id: 0, desc: "Selecione" }]

  materiais.then((ele) => {
    const data = ele.data as any[];
    data.forEach(item => {
      ddlMateriais.push({ id: item.id, desc: item.descricao })
    });
    callback(ddlMateriais)
  })
}

export type FormAddMateriaisProps = {
listaMateriais: string,
salvarMateriaislista: (evt:any) => void

}


export function FormAddMateriais({...props}: FormAddMateriaisProps) {
  const [materialId, setMaterialId] = useState<string>();
  const [peso, setPeso] = useState<string>();
  const [ddlListaMateriais, setDdlListaMateriais] = useState<any[]>([]);


 
  React.useEffect(() => {
    recuperaInfoMaterial((items) => {
      setDdlListaMateriais(items);
    });
  }, []);

  const pesoOptions = ["Leve", "Médio", "Pesado"];

  function handlePesoChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setPeso(event.target.value)
  }

  function handleMaterialChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setMaterialId(event.target.value)
  }

  function btnAdicionarMateriais(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const novaListaMateriais = props.listaMateriais.concat(`${materialId}:${peso};`);
    props.salvarMateriaislista(novaListaMateriais);
  
  }

  return (
    <>
      <div className="title">
        <h4 className="text-[#666666] text-m my-1">Materiais da coleta</h4>
      </div>

      <div className="dados-cliente" >
        <DropdownCombo
          options={ddlListaMateriais}
          label="Descrição do material"
          placeholder="latas, garrafas, etc."
          onChange={handleMaterialChange}
          required
        />

        <DropdownInput
          options={pesoOptions}
          label="Peso do material"
          placeholder="Leve,pesado..."
          onChange={handlePesoChange}
          required
        />

        <Button2
          type="button"
          label="Adicionar material"
          onClick={btnAdicionarMateriais}
          className="w-[80%] mt-[15px]"
        />
      </div>
      <div id="listaAmostraMateriais">
        {
            props.listaMateriais != undefined ?  props.listaMateriais.split(";").map( (item) => (
              <div>
                <label>{item}</label>
              </div>
            )) : ""
        }
      </div>
    </>
  )
}


