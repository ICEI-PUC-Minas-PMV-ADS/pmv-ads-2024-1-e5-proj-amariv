import React, { useState, useEffect } from 'react';
import MaterialCard from '../../components/MaterialCard';
import { Button2 } from '../../components/Button2';
import { Button3 } from '../../components/Button3';
import { DropdownInput } from '../../components/DropdownInput';
import { Input } from '../../components/Input';
import { Form } from '../../components/Form';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5100';

interface Material {
  id: number;
  descricao: string;
  tipo: string;
  peso: string;
}

const MaterialPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [showMaterialPanel, setShowMaterialPanel] = useState(false);
  const [materialInfo, setMaterialInfo] = useState<Material>({
    id: 0,
    descricao: "",
    tipo: "",
    peso: "",
  });
  const [searchDescription, setSearchDescription] = useState("");
  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = () => {
    axios.get(`${API_BASE_URL}/RecuperaMateriais`)
      .then(response => {
        console.log("Materiais recuperados:", response.data);
        setMaterials(response.data);
      })
      .catch(error => console.error("Erro ao recuperar materiais:", error));
  };

  const handleAddMaterial = () => {
    if (editingIndex !== null) {
      axios.post(`${API_BASE_URL}/UpdateMaterial?id=${editingIndex}`, materialInfo)
        .then(() => {
          console.log("Material atualizado com sucesso!");
          fetchMaterials();
        })
        .catch(error => console.error("Erro ao atualizar material:", error));
    } else {
      axios.post(`${API_BASE_URL}/SalvarMaterial`, materialInfo)
        .then(() => {
          console.log("Material adicionado com sucesso!");
          fetchMaterials();
        })
        .catch(error => console.error("Erro ao adicionar material:", error));
    }

    setMaterialInfo({ id: 0, descricao: "", tipo: "", peso: "" });
    setShowMaterialPanel(false);
  };

  const handleEditMaterial = (index: number) => {
    setMaterialInfo(materials[index]);
    setEditingIndex(materials[index].id); // Definir o ID do material
    setShowMaterialPanel(true);
  };

  const handleDeleteMaterial = (id: number) => {
    axios.delete(`${API_BASE_URL}/DeletarMaterial?id=${id}`)
      .then(() => {
        console.log("Material excluído com sucesso!");
        setMaterials(prevMaterials => prevMaterials.filter(material => material.id !== id));
      })
      .catch(error => console.error("Erro ao excluir material:", error));
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
    <div className="App">
      <div className="content">
        <div className="title">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem]">
            Materiais
          </h2>
          <div>
            <Button2
              type="button"
              label="Adicionar material"
              onClick={() => {
                setEditingIndex(null);
                setShowMaterialPanel(true);
              }}
              className="w-[150px] mt-[15px]"
            />
            {showMaterialPanel && (
              <div className="material-panel">
                <div className="title">
                  <p className="text-[#666666] text-m my-1">
                    {editingIndex !== null ? "Editar material" : "Adicionar material"}
                  </p>
                </div>
                <div className="addmaterial">
                  <div>
                    <Input
                      type="text"
                      label="Descrição"
                      value={materialInfo.descricao}
                      onChange={(e) => setMaterialInfo({ ...materialInfo, descricao: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Tipo"
                      value={materialInfo.tipo}
                      onChange={(e) => setMaterialInfo({ ...materialInfo, tipo: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Peso"
                      value={materialInfo.peso}
                      onChange={(e) => setMaterialInfo({ ...materialInfo, peso: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="material-buttons">
                  <div>
                    <Button3
                      type="button"
                      label="Cancelar"
                      onClick={() => {
                        setMaterialInfo({ id: 0, descricao: "", tipo: "", peso: "" });
                        setShowMaterialPanel(false);
                      }}
                      className="w-[140px]"
                    />
                  </div>
                  <div>
                    <Button2
                      type="button"
                      label={editingIndex !== null ? "Salvar" : "Adicionar"}
                      onClick={handleAddMaterial}
                      className="w-[140px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Form>
          <div className="title">
            <p className="text-[#666666] text-m my-1">Filtros</p>
          </div>
          <div className="dados-cliente">
            <div>
              <Input
                type="text"
                label="Pesquisar por descrição"
                value={searchDescription}
                onChange={(e) => setSearchDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <DropdownInput
                label="Pesquisar por tipo"
                options={materialOptions}
                placeholder="Selecione um material..."
                value={selectedMaterialType}
                onChange={(e) => setSelectedMaterialType(e.target.value)}
                required
              />
            </div>
          </div>
        </Form>

        <div className="material-cards">
          {materials.map((material, index) => (
            <MaterialCard
              key={material.id} // Usando o ID como chave
              material={material}
              onEdit={() => handleEditMaterial(index)}
              onDelete={() => handleDeleteMaterial(material.id)} // Passando o ID para a função
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;
