import axios from 'axios';
import { Material } from '../models/Material';

const useApi = axios.create({
  baseURL: "http://localhost:5100"
});

const API_BASE_URL = 'http://localhost:5100';

export const fetchMaterials = (): Promise<Material[]> => {
  return axios.get(`${API_BASE_URL}/RecuperaMateriais`)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao recuperar materiais:", error);
      throw error;
    });
};


export const materialService = {
  recuperaMateriais : async () => {
     const response = await useApi.get("/RecuperaMateriais", {
         headers: {
             "Content-type": "application/json; chatset=utf-8"
         }
     });
     return response
  }
}

export const updateMaterial = (id: number, materialInfo: Material): Promise<void> => {
  return axios.post(`${API_BASE_URL}/UpdateMaterial?id=${id}`, materialInfo)
    .then(() => console.log("Material atualizado com sucesso!"))
    .catch(error => {
      console.error("Erro ao atualizar material:", error);
      throw error;
    });
};

export const saveMaterial = (materialInfo: Material): Promise<void> => {
  return axios.post(`${API_BASE_URL}/SalvarMaterial`, materialInfo)
    .then(() => console.log("Material adicionado com sucesso!"))
    .catch(error => {
      console.error("Erro ao adicionar material:", error);
      throw error;
    });
};

export const deleteMaterial = (id: number): Promise<void> => {
  return axios.delete(`${API_BASE_URL}/DeletarMaterial?id=${id}`)
    .then(() => console.log("Material excluído com sucesso!"))
    .catch(error => {
      console.error("Erro ao excluir material:", error);
      throw error;
    });
};

