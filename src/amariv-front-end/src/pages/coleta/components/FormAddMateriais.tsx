import { useRef, useState } from "react";
import { Button2 } from "../../../components/Button2";
import { Button3 } from "../../../components/Button3";
import DropdownInput from "../../../components/DropdownInput";
import { Input } from "../../../components/Input";


export function FormAddMateriais () {
    const [showMaterialPanel, setShowMaterialPanel] = useState(false);
    const [materials, setMaterials] = useState<Material[]>([]);


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


      const pesoRef = useRef<HTMLSelectElement>(null);
      const handlePesoChange = () => {
        if (pesoRef.current) {
          const selectedPeso = pesoRef.current.value;
          console.log("Peso informado: ", selectedPeso);
        }
      };
      const pesoOptions = ["Informe o peso...", "Leve", "Médio", "Pesado"];

      const materialOptions = [
        "Selecione...",
        "Metal",
        "Plástico",
        "Papel",
        "Papelão",
        "Vidro",
      ];

      const materialRef = useRef<HTMLSelectElement>(null);
      const handleMaterialChange = () => {
        if (materialRef.current) {
          const selectedMaterial = materialRef.current.value;
          console.log("Material selecionado:", selectedMaterial);
        }
      };


    return (
        <>
            <div className="title">
                <p className="text-[#666666] text-m my-1">Materiais da coleta</p>
            </div>

            <div className="dados-cliente" >

                <DropdownInput
                    options={materialOptions}
                    ref={materialRef}
                    label="Descrição do material"
                    placeholder="latas, garrafas, etc."
                    onChange={handleMaterialChange}
                    required
                />

                <DropdownInput
                    options={pesoOptions}
                    ref={pesoRef}
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


                    {showMaterialPanel && (
                        <div className="material-panel">
                            <div className="title">
                                <p className="text-[#666666] text-m my-1">
                                    Adicionar material
                                </p>
                            </div>
                            <div className="addmaterial">
                                <Input
                                    type="text"
                                    label="Descrição Material"

                                />

                                <DropdownInput
                                    label="Informe o peso"
                                    options={pesoOptions}
                                    placeholder="Selecione um material..."
                                    ref={pesoRef}
                                    onChange={handleMaterialChange}
                                    required
                                />

                            </div>
                            <div className="materal-buttons">
                                <div>
                                    <Button3
                                        type="button"
                                        label="Cancelar"
                                        onClick={handleCancelClick}
                                        className="w-[140px]"
                                    />
                                </div>
                                <div>
                                    <Button2
                                        type="button"
                                        label="Adicionar"
                                        onClick={addMaterial}
                                        className="w-[140px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
