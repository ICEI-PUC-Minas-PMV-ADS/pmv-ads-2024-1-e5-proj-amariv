import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from '../../components/Filter';
import FuncionarioCard from '../../components/FuncionarioCard';
import Modal from '../../components/Modal';
import { Button2 } from '../../components/Button2';

const API_BASE_URL = 'http://localhost:5100';

interface Funcionario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

interface FuncionarioInfo {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

const initialFuncionarioInfo: FuncionarioInfo = {
  id: 0,
  nome: "",
  email: "",
  cargo: "",
};

const createFuncionarioInfo = (): FuncionarioInfo => ({
  ...initialFuncionarioInfo,
});

const FuncionariosPage = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [showFuncionarioPanel, setShowFuncionarioPanel] = useState(false);
  const [funcionarioInfo, setFuncionarioInfo] = useState<FuncionarioInfo>(createFuncionarioInfo());
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCargo, setFilteredCargo] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const cargoOptions = ["Todos", "Analista", "Gerente", "Desenvolvedor", "Outro"];

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = () => {
    axios.get(`${API_BASE_URL}/api/funcionario`)
      .then(response => {
        setFuncionarios(response.data);
      })
      .catch(error => console.error("Erro ao recuperar funcionários:", error));
  };

  const handleAddFuncionario = () => {
    const url = editingIndex ? `${API_BASE_URL}/api/funcionario/${editingIndex}` : `${API_BASE_URL}/api/funcionario`;
    const method = editingIndex ? 'put' : 'post';

    axios[method](url, funcionarioInfo)
      .then(() => {
        fetchFuncionarios();
        setFuncionarioInfo(createFuncionarioInfo());
        setShowFuncionarioPanel(false);
        setEditingIndex(null);
      })
      .catch(error => console.error(`Erro ao ${editingIndex ? 'atualizar' : 'adicionar'} funcionário:`, error));
  };

  const handleEditFuncionario = (funcionario: Funcionario) => {
    setFuncionarioInfo({ ...funcionario });
    setEditingIndex(funcionario.id);
    setShowFuncionarioPanel(true);
  };

  const handleDeleteFuncionario = (id: number) => {
    console.log('Excluindo funcionário com ID:', id);
    axios.delete(`${API_BASE_URL}/api/funcionario/${id}`)
      .then(() => {
        console.log('Funcionário excluído com sucesso!');
        setFuncionarios(funcionarios.filter(funcionario => funcionario.id !== id));
      })
      .catch(error => {
        console.error("Erro ao excluir funcionário:", error);
        console.error('Resposta do servidor:', error.response?.data);
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
    <div className="App">
      <div className="content">
        <div className="title">
          <h2 className="mt-[30px] text-[#53735B] text-[1.75rem] float-left">Funcionários</h2>
          <Button2
            type="button"
            label="Adicionar funcionário"
            onClick={() => {
              setEditingIndex(null);
              setShowFuncionarioPanel(true);
            }}
            className="w-[200px] mt-[15px] float-right"
          />
        </div>

        {showFuncionarioPanel && (
          <Modal
            title={editingIndex ? "Editar Funcionário" : "Adicionar Funcionário"}
            fields={[
              { type: 'input', label: 'Nome', value: funcionarioInfo.nome, onChange: (value) => setFuncionarioInfo({ ...funcionarioInfo, nome: value }) },
              { type: 'input', label: 'Email', value: funcionarioInfo.email, onChange: (value) => setFuncionarioInfo({ ...funcionarioInfo, email: value }) },
              { type: 'select', label: 'Cargo', value: funcionarioInfo.cargo, onChange: (value) => setFuncionarioInfo({ ...funcionarioInfo, cargo: value }), options: cargoOptions },
            ]}
            onSave={handleAddFuncionario}
            onCancel={() => {
              setFuncionarioInfo(createFuncionarioInfo());
              setShowFuncionarioPanel(false);
            }}
          />
        )}

        <Filter
          title="Filtros"
          fields={[
            { type: 'input', label: 'Pesquisar por nome', value: searchTerm, onChange: setSearchTerm },
            { type: 'select', label: 'Filtrar por cargo', value: filteredCargo, onChange: setFilteredCargo, options: cargoOptions, placeholder: 'Selecione um cargo...' },
          ]}
        />

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
      </div>
    </div>
  );
};

export default FuncionariosPage;