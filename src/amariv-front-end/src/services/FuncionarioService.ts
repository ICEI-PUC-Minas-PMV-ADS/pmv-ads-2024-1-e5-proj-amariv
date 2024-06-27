import { useApi } from "../hooks/useApi";

interface Funcionario {
  id: string;
  nome: string;
  email: string;
  sexo: string;
  telefone: string;
  cargo: string;
  senha: string;
  suportaPeso: boolean;
}

const fetchFuncionarios = (): Promise<Funcionario[]> => {
  const token = localStorage.getItem('authToken');
  return useApi.get(`api/funcionario`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-type": "application/json; chatset=utf-8"
    }
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao recuperar funcionários:", error);
      return [];
    });
};

const addFuncionario = (funcionarioInfo: Funcionario): Promise<void> => {
  const token = localStorage.getItem('authToken');
  return useApi.post(`CadastrarFuncionario`, funcionarioInfo, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-type": "application/json; chatset=utf-8"
    }
  })
    .then(() => { })
    .catch(error => console.error("Erro ao adicionar funcionário:", error));
};

const updateFuncionario = (id: string, funcionarioInfo: Funcionario): Promise<void> => {
  const token = localStorage.getItem('authToken');
  return useApi.put(`api/funcionario/${id}`, funcionarioInfo, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-type": "application/json; chatset=utf-8"
    }
  })
    .then(() => { })
    .catch(error => console.error("Erro ao atualizar funcionário:", error));
};

const deleteFuncionario = (id: string): Promise<void> => {
  const token = localStorage.getItem('authToken');
  return useApi.delete(`api/funcionario/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-type": "application/json; chatset=utf-8"
    }
  })
    .then(() => { })
    .catch(error => console.error("Erro ao excluir funcionário:", error));
};

export {
  fetchFuncionarios,
  addFuncionario,
  updateFuncionario,
  deleteFuncionario,
  type Funcionario
};
