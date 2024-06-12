import {  useEffect, useState } from "react";
import { Button2 } from "../../../components/Button2";
import { materialService } from "../../../services/MaterialService";
import React from "react";
import PrimaryButton from "../../../components/re_components/PrimaryButton";
import AddMaterial from "../../../components/re_components/AddMaterial";
import img from "../../../assets/sem-dados.png"

export type FormAddMateriaisProps = {
listaMateriais: string,
salvarMateriaislista: (materiais : string) => void

}

export function FormAddMateriais({listaMateriais, salvarMateriaislista}: FormAddMateriaisProps) {

  const [materiais, setMateriais] = useState<any[]>([])
  const [modalMaterialOpen, setModalMaterialOpen] = useState(false)
  const [materiaisAdicionados, setMateriaisAdicionados] = useState<any[]>([])
  

  React.useEffect(() => {
    materialService.recuperaMateriais()
      .then((newMaterials) => setMateriais(newMaterials))
      .catch((err) => console.log(err));
  },[])

  useEffect( () => {
     if (listaMateriais !== "" ) {
      const novaListaMaterial: {idMaterial: string, peso: string}[] = [];
      const novaLista: string[] = listaMateriais.split(";");
      novaLista.forEach( item => {  
        let material = item.split(":");
        novaListaMaterial.push({
          idMaterial: material[0],
          peso: material[1]
        });
      }); 
      setMateriaisAdicionados(novaListaMaterial);
     }
  },[listaMateriais]) 
  
  const ItemMaterial = (material: any, index: number) => {
    return (
      <div key={index} className=" bg-input-color w-full flex flex-col p-4 rounded-lg">
        <p className="">Material: {materiais.find(x => x.id == material.idMaterial)?.descricao}</p>
        <p className="">Peso: {material.peso}</p>
        <div className="flex gap-2 mt-4">
          <PrimaryButton color="red" title="Excluir" onClick={() => {

            let copia = [...materiaisAdicionados]
            copia.splice(index, 1)
            setMateriaisAdicionados(copia)
            let numeroItensIncluidos = 0;
            let novaListaMateriais = "";
            const materiais = listaMateriais.split(";");
            for (let i = 0 ; i < materiais.length; i++) {
              const mat = materiais[i];
              const [id] = mat.split(':');
              const foiExcluido = id === material.idMaterial.toString();

              if (!foiExcluido) {
                if (numeroItensIncluidos === 0) {
                  novaListaMateriais += mat;
                } else {
                  novaListaMateriais += ";" + mat;
                }
                numeroItensIncluidos += 1;
              }              
            }
            salvarMateriaislista(novaListaMateriais);
          }} />
        </div>
      </div>
    )
  }

 
  return (
    <>
      <div className="title">
        <h4 className="text-[#666666] text-lg my-1">Materiais da coleta</h4>
      </div>

      <div className="w-full p-9 px-20 border rounded-lg bg-[#E8F4EB] md:flex md:flex-wrap md:gap-10">
        <div className="p-5 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-2 lg:max-w-[1220px] md:max-w-[810px]">
          {
            materiaisAdicionados.length == 0 &&
            <div className="flex flex-col gap-4 items-center justify-center p-8">
              <img src={img} className="w-[30%]" />
              <p className="font-light text-lg">{"Nenhum material adicionado..."}</p>
            </div>
          }
          {
            materiaisAdicionados.length > 0 &&
            materiaisAdicionados.map((material, index) => ItemMaterial(material, index))
          }
        <div/>
        <AddMaterial
          materiais={materiais}
          isOpen={modalMaterialOpen}
          onCancel={() => { setModalMaterialOpen(false) }}
          onConfirm={(idMaterial, peso) => {
            let novoMaterial = {
              idMaterial: idMaterial,
              peso: peso
            }

            let copiaMateriais = [...materiaisAdicionados]
            copiaMateriais.unshift(novoMaterial)

            if(listaMateriais === "")
              salvarMateriaislista(listaMateriais + `${idMaterial}:${peso}`)
            else
              salvarMateriaislista(listaMateriais + `;${idMaterial}:${peso}`)
           
            setMateriaisAdicionados(copiaMateriais)
            setModalMaterialOpen(false)
            
        }} />
     
        </div>
        <div className="w-full text-right">
           <Button2
          type="button"
          label="Adicionar material"
          onClick={ () => { setModalMaterialOpen(true) }}
          className="w-[30%] mt-[15px] mb-3"
        />
        </div>
       
      </div>

    </>
  )
}
