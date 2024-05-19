import React, { useState, useEffect } from 'react';
import MaterialCard from '../../components/MaterialCard';
import MaterialModal from '../../components/MaterialModal';
import { Button2 } from '../../components/Button2';
import axios from 'axios';
import MaterialFilter from '../../components/MaterialFilter';

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMaterialType, setFilteredMaterialType] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const materialOptions = [
    "Todos",
    "Metal",
    "Plástico",
    "Papel",
    "Papelão",
    "Vidro",
  ];

  const weightOptions = [
    "Todos",
    "Leve",
    "Médio",
    "Pesado",
  ];

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

  const handleSearch = () => {
    if (searchTerm === "" && filteredMaterialType === "Todos") {
      return materials;
    } else {
      return materials.filter(material => {
        const matchesSearchTerm = searchTerm === "" || material.descricao.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMaterialType = filteredMaterialType === "Todos" || material.tipo === filteredMaterialType;
        return matchesSearchTerm && matchesMaterialType;
      });
    }
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
    setEditingIndex(materials[index].id);
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

  return (
    <div className="App">
      <div className="content">
        <div className="title">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem] float-left">
            Materiais
          </h2>
          <Button2
            type="button"
            label="Adicionar material"
            onClick={() => {
              setEditingIndex(null);
              setShowMaterialPanel(true);
            }}
            className="w-[150px] mt-[15px] float-right"
          />
        </div>

        {showMaterialPanel && (
          <MaterialModal
            materialInfo={materialInfo}
            materialOptions={materialOptions}
            weightOptions={weightOptions}
            onSave={handleAddMaterial}
            onCancel={() => {
              setMaterialInfo({ id: 0, descricao: "", tipo: "", peso: "" });
              setShowMaterialPanel(false);
            }}
            onChange={(field, value) =>
              setMaterialInfo({ ...materialInfo, [field]: value })
            }
          />
        )}

        <MaterialFilter
          materialOptions={materialOptions}
          selectedMaterialType={filteredMaterialType}
          setSelectedMaterialType={setFilteredMaterialType}
          searchDescription={searchTerm}
          setSearchDescription={setSearchTerm}
        />

        <div className="mt-8 material-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-12">
          {handleSearch().map((material, index) => (
            <MaterialCard
              key={material.id}
              material={material}
              onEdit={() => handleEditMaterial(index)}
              onDelete={() => handleDeleteMaterial(material.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialPage;