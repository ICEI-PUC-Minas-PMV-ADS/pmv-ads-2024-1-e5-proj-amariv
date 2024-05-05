import React, { useState, useRef } from "react";
import { Input } from "../../components/Input";
import { InputDate } from "../../components/InputDate";
import { InputTime } from "../../components/InputTime";
import { Button2 } from "../../components/Button2";
import { Button3 } from "../../components/Button3";
import { DropdownInput } from "../../components/DropdownInput";
import { Form } from "../../components/Form";
import "./index.css";
import { Link } from "react-router-dom";

interface Material {
  description: string;
  quantity: string;
}

export function MaterialPage() {
  const [active, setMode] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showMaterialPanel, setShowMaterialPanel] = useState(false);
  const [materialInfo, setMaterialInfo] = useState<Material>({
    description: "",
    quantity: "",
  });

  const toggleMode = () => {
    setMode(!active);
  };

  const toggleMaterialPanel = () => {
    setShowMaterialPanel(!showMaterialPanel);
  };
  const handleCancelClick = () => {
    setShowMaterialPanel(!showMaterialPanel);
  };

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

  const materialRef = useRef<HTMLSelectElement>(null);

  const handleMaterialChange = () => {
    if (materialRef.current) {
      const selectedMaterial = materialRef.current.value;
      console.log("Material selecionado:", selectedMaterial);
    }
  };
  const materialOptions = [
    "Selecione...",
    "Metal",
    "Plástico",
    "Papel",
    "Papelão",
    "Vidro",
  ];

  return (
    <>
      <div className="App">
        <div
          className={active ? "icon iconActive" : "icon"}
          onClick={toggleMode}
        >
          <div className="hamburger hamburgerIcon"></div>
        </div>
        <div className={active ? "menu menuOpen" : "menu menuClose"}>
          <div className="list">
            <Link className="listItems" to={""}>
              Coletas pendentes
            </Link>
            <Link className="listItems" to={""}>
              Roteiro de coletas
            </Link>
            <Link className="listItems" to={"/coleta"}>
              Agendamento
            </Link>
            <Link className="listItems" to={""}>
              Histórico de Coletas
            </Link>
            <Link className="listItems" to={""}>
              Materiais
            </Link>
            <Link className="listItems" to={""}>
              Funcionários
            </Link>
          </div>
        </div>

        <div className="content">
          <div className="title">
            <div>
              <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
                Materiais
              </h2>
            </div>
            <div>
              <div>
                <Button2
                  type="button"
                  label="Adicionar material"
                  onClick={toggleMaterialPanel}
                  className="w-[150px] mt-[15px]"
                />
                {showMaterialPanel && (
                  <div className="material-panel">
                    <div className="title">
                      <p className="text-[#666666] text-m my-1">
                        Adicionar material
                      </p>
                    </div>
                    <div className="addmaterial">
                      <div>
                        <Input type="text" label="Descrição" required />
                      </div>
                      <div>
                        <DropdownInput
                          label="Selecione um material"
                          options={materialOptions}
                          placeholder="Selecione um material..."
                          ref={materialRef}
                          onChange={handleMaterialChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="material-buttons">
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
          </div>

          <Form>
            <div className="title">
              <p className="text-[#666666] text-m my-1">Filtros</p>
            </div>
            <div className="dados-cliente">
              <div>
                <Input type="text" label="Pesquisar por descrição" required />
              </div>
              <div>
                <DropdownInput
                  label="Pesquisar por tipo"
                  options={materialOptions}
                  placeholder="Selecione um material..."
                  ref={materialRef}
                  onChange={handleMaterialChange}
                  required
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default MaterialPage;
