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
  return useApi.get(`api/funcionario`)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao recuperar funcionários:", error);
      return [];
    });
};

const addFuncionario = (funcionarioInfo: Funcionario): Promise<void> => {
  return useApi.post(`CadastrarFuncionario`, funcionarioInfo)
    .then(() => { })
    .catch(error => console.error("Erro ao adicionar funcionário:", error));
};

const updateFuncionario = (id: string, funcionarioInfo: Funcionario): Promise<void> => {
  return useApi.put(`api/funcionario/${id}`, funcionarioInfo)
    .then(() => { })
    .catch(error => console.error("Erro ao atualizar funcionário:", error));
};

const deleteFuncionario = (id: string): Promise<void> => {
  return useApi.delete(`api/funcionario/${id}`)
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
