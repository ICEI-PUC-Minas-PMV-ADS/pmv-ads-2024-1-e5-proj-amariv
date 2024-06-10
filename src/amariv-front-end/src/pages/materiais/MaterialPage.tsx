import React, { useState, useEffect } from 'react';
import MaterialCard from '../../components/MaterialCard';
import Modal from '../../components/Modal';
import { Button2 } from '../../components/Button2';
import Filter from '../../components/Filter';
import { Material } from '../../models/Material';
import { materialService } from '../../services/MaterialService';

const MaterialPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialInfo, setMaterialInfo] = useState<Material>({
    id: 0,
    descricao: "",
    tipo: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMaterialType, setFilteredMaterialType] = useState("Todos");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const materialOptions = [
    "Todos",
    "Metal",
    "Plástico",
    "Papel",
    "Papelão",
    "Vidro",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await materialService.fetchMaterials();
        setMaterials(data);
      } catch (error) {
        console.error("Erro ao buscar materiais:", error);
      }
    };
    fetchData();
  }, []);

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

  const handleAddMaterial = async () => {
    try {
      if (editingIndex !== null) {
        await materialService.updateMaterial(editingIndex, materialInfo);
      } else {
        await materialService.saveMaterial(materialInfo);
      }

      setMaterialInfo({ id: 0, descricao: "", tipo: "" });
      setShowModal(false);
      const updatedMaterials = await materialService.fetchMaterials();
      setMaterials(updatedMaterials);
    } catch (error) {
      console.error("Erro ao adicionar/atualizar material:", error);
    }
  };

  const handleEditMaterial = (index: number) => {
    setMaterialInfo(materials[index]);
    setEditingIndex(materials[index].id);
    setShowModal(true);
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      await materialService.deleteMaterial(id);
      const updatedMaterials = materials.filter(material => material.id !== id);
      setMaterials(updatedMaterials);
    } catch (error) {
      console.error("Erro ao excluir material:", error);
    }
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
              setShowModal(true);
            }}
            className="w-[150px] mt-[15px] float-right"
          />
        </div>

        <Filter
          title="Filtros"
          fields={[
            {
              type: 'input',
              label: 'Pesquisar por descrição',
              value: searchTerm,
              onChange: setSearchTerm,
            },
            {
              type: 'select',
              label: 'Pesquisar por tipo',
              value: filteredMaterialType,
              onChange: setFilteredMaterialType,
              options: materialOptions,
              placeholder: 'Selecione um material...',
            },
          ]}
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

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <Modal
              title="Adicionar Material"
              fields={[
                {
                  type: 'input',
                  label: 'Descrição',
                  value: materialInfo.descricao,
                  onChange: (value) => setMaterialInfo({ ...materialInfo, descricao: value }),
                },
                {
                  type: 'select',
                  label: 'Tipo',
                  value: materialInfo.tipo,
                  onChange: (value) => setMaterialInfo({ ...materialInfo, tipo: value }),
                  options: materialOptions,
                },
              ]}
              onSave={handleAddMaterial}
              onCancel={() => {
                setMaterialInfo({ id: 0, descricao: "", tipo: "" });
                setShowModal(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialPage;