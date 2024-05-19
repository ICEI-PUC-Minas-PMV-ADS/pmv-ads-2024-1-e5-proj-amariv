import { useState } from "react";
import { Button2 } from "../../../components/Button2";
import DropdownInput from "../../../components/DropdownInput";
import { materialService } from "../../../services/MaterialService";
import React from "react";
import DropdownCombo from "../../../components/DropdownCombo";


function recuperaInfoMaterial(callback: (items: any[]) => void) {
  const materiais = materialService.recuperaMateriais() 
  const ddlMateriais = [{id:0, desc: "Selecione"} ] 

  materiais.then( (ele) => {
    const data = ele.data as any[];
    data.forEach( item => {
      ddlMateriais.push({id: item.id, desc : item.descricao  })
    });
    callback( ddlMateriais )
  })
}

export function FormAddMateriais () {
    const [showMaterialPanel, setShowMaterialPanel] = useState(false);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [listaMateriais, setListaMateriais] = useState<any[]>([]);


    interface Material {
        description: string;
        quantity: string;
    }

    const toggleMaterialPanel = () => {
        setShowMaterialPanel(!showMaterialPanel);
      };

      const handleCancelClick = () => {
        setShowMaterialPanel(!showMaterialPanel);
      };

      const [materialInfo, setMaterialInfo] = useState<Material>({
        description: "",
        quantity: "",
      });

      const handleMaterialInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMaterialInfo({
          ...materialInfo,
          [name]: value,
        });
      };

      const addMaterial = () => {
        setMaterials((prevMaterials) => [...prevMaterials, materialInfo]);
        setMaterialInfo({
          description: "",
          quantity: "",
        });
        toggleMaterialPanel();
      };


     
      
      const pesoOptions = [ "Leve", "Médio", "Pesado"];

     
           
  React.useEffect(() => {
    recuperaInfoMaterial((items) => {
      setListaMateriais(items);
    });
  }, []);
      

  function handlePesoChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    throw new Error("Function not implemented.");
  }

  function handleMaterialChange(event: React.ChangeEvent<HTMLSelectElement>): void {
  

  }

    return (
        <>
            <div className="title">
                <p className="text-[#666666] text-m my-1">Materiais da coleta</p>
            </div>

            <div className="dados-cliente" >

                <DropdownCombo
                    options={listaMateriais}                  
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

                <div>
                    <Button2
                        type="button"
                        label="Adicionar material"
                        onClick={toggleMaterialPanel}
                        className="w-[80%] mt-[15px]"
                    />
               
                </div>
            </div>
        </>
    )
}



