import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter';
import FuncionarioCard from '../../components/FuncionarioCard';
import FuncionarioModal from '../../components/FuncionarioModal';
import { Button2 } from '../../components/Button2';
import { fetchFuncionarios, addFuncionario, updateFuncionario, deleteFuncionario } from '../../services/FuncionarioService';
import { Funcionario } from '../../models/Funcionario';
import { FuncionarioMapper } from '../../mappers/FuncionarioMappers';

const initialFuncionarioInfo: Funcionario = {
  id: "",
  nome: "",
  email: "",
  sexo: "",
  telefone: "",
  cargo: "",
  senha: "",
  suportaPeso: false,
};

const FuncionariosPage = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [showFuncionarioModal, setShowFuncionarioModal] = useState(false);
  const [funcionarioInfo, setFuncionarioInfo] = useState<Funcionario>(initialFuncionarioInfo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCargo, setFilteredCargo] = useState("Todos");
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  const cargoOptions = ["Todos", "Motorista", "Reciclagem", "Outro"];

  useEffect(() => {
    fetchFuncionarios().then(data => {
      const mappedFuncionarios = data.map(funcionario => FuncionarioMapper.mapFuncionarioFromApi(funcionario));
      setFuncionarios(mappedFuncionarios);
    });
  }, []);

  const handleEditFuncionario = (funcionario: Funcionario) => {
    setFuncionarioInfo(funcionario);
    setEditingIndex(funcionario.id);
    setShowFuncionarioModal(true);
  };

  const handleAddFuncionario = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingIndex !== null) {
      updateFuncionario(editingIndex, FuncionarioMapper.mapFuncionarioToApi(funcionarioInfo)).then(() => {
        fetchFuncionarios().then(data => {
          const mappedFuncionarios = data.map(funcionario => FuncionarioMapper.mapFuncionarioFromApi(funcionario));
          setFuncionarios(mappedFuncionarios);
        });
      });
    } else {
      addFuncionario(FuncionarioMapper.mapFuncionarioToApi(funcionarioInfo)).then(() => {
        fetchFuncionarios().then(data => {
          const mappedFuncionarios = data.map(funcionario => FuncionarioMapper.mapFuncionarioFromApi(funcionario));
          setFuncionarios(mappedFuncionarios);
        });
      });
    }

    setFuncionarioInfo(initialFuncionarioInfo);
    setShowFuncionarioModal(false);
    setEditingIndex(null);
  };

  const handleDeleteFuncionario = (id: string) => {
    deleteFuncionario(id).then(() => {
      setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id));
    });
  };

  const handleSearch = () => {
    return funcionarios.filter(funcionario => {
      const matchesSearchTerm = searchTerm === "" || funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCargo = filteredCargo === "Todos" || funcionario.cargo === filteredCargo;
      return matchesSearchTerm && matchesCargo;
    });
  };

  return (
    <div className="App content px-20 py-8">
      <div className="content">
        <div className="title">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem] float-left">Funcionários</h2>
          <Button2
            type="button"
            label="Adicionar funcionário"
            onClick={() => {
              setEditingIndex(null);
              setShowFuncionarioModal(true);
            }}
            className="w-[200px] mt-[15px] float-right"
          />
        </div>

        {showFuncionarioModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="relative rounded-lg shadow-lg w-full max-w-md">
              <FuncionarioModal
                title={editingIndex ? "Editar Funcionário" : "Adicionar Funcionário"}
                funcionarioInfo={funcionarioInfo}
                setFuncionarioInfo={setFuncionarioInfo}
                onSave={handleAddFuncionario}
                onCancel={() => {
                  setFuncionarioInfo(initialFuncionarioInfo);
                  setShowFuncionarioModal(false);
                }}
              />
            </div>
          </div>
        )}

        <Filter
          title="Filtros"
          fields={[
            { type: 'input', label: 'Pesquisar por nome', value: searchTerm, onChange: setSearchTerm },
            { type: 'select', label: 'Filtrar por cargo', value: filteredCargo, onChange: setFilteredCargo, options: cargoOptions },
          ]}
        />

        {funcionarios.length > 0 ? (
          <div className="mt-8 material-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-12">
            {handleSearch().map(funcionario => (
              <FuncionarioCard
                key={funcionario.id}
                funcionario={funcionario}
                onEdit={() => handleEditFuncionario(funcionario)}
                onDelete={() => handleDeleteFuncionario(funcionario.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p>Nenhum funcionário encontrado.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuncionariosPage;
