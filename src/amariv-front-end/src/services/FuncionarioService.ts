import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5100';

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
  return axios.get(`${API_BASE_URL}/api/funcionario`)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao recuperar funcionários:", error);
      return [];
    });
};

const addFuncionario = (funcionarioInfo: Funcionario): Promise<void> => {
  return axios.post(`${API_BASE_URL}/CadastrarFuncionario`, funcionarioInfo)
    .then(() => {})
    .catch(error => console.error("Erro ao adicionar funcionário:", error));
};

const updateFuncionario = (id: string, funcionarioInfo: Funcionario): Promise<void> => {
  return axios.put(`${API_BASE_URL}/api/funcionario/${id}`, funcionarioInfo)
    .then(() => {})
    .catch(error => console.error("Erro ao atualizar funcionário:", error));
};

const deleteFuncionario = (id: string): Promise<void> => {
  return axios.delete(`${API_BASE_URL}/api/funcionario/${id}`)
    .then(() => {})
    .catch(error => console.error("Erro ao excluir funcionário:", error));
};

export {
  fetchFuncionarios,
  addFuncionario,
  updateFuncionario,
  deleteFuncionario,
  type Funcionario
};
