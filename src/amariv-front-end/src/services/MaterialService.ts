import axios from 'axios';
import { Material } from '../models/Material';
import { useApi } from '../hooks/useApi';

export const materialService = {
  stringMateriais: (string: string, listaMateriais: Material[]) => {
    // Dividir a string em pares de "idMaterial:Peso"
    const pares: string[] = string.split(';');
    const resultado: string[] = [];

    pares.forEach(par => {
      const [idMaterial, peso] = par.split(':');
      if (idMaterial) {
        const nomeMaterial = listaMateriais.find(x => x.id == parseInt(idMaterial))?.descricao
        resultado.push(`${nomeMaterial} (${peso})`);
      }
    });

    return resultado.join(', ');
  },

  recuperaMateriais: async () => {
    const response = await useApi.get("/RecuperaMateriais", {
      headers: {
        "Content-type": "application/json; chatset=utf-8"
      }
    });
    return response.data
  },

  fetchMaterials: (): Promise<Material[]> => {
    return useApi.get(`RecuperaMateriais`)
      .then(response => response.data)
      .catch(error => {
        console.error("Erro ao recuperar materiais:", error);
        throw error;
      })
  },

  updateMaterial: (id: number, materialInfo: Material): Promise<void> => {
    return useApi.post(`UpdateMaterial?id=${id}`, materialInfo)
      .then(() => console.log("Material atualizado com sucesso!"))
      .catch(error => {
        console.error("Erro ao atualizar material:", error);
        throw error;
      })
  },

  saveMaterial: (materialInfo: Material): Promise<void> => {
    return useApi.post(`SalvarMaterial`, materialInfo)
      .then(() => console.log("Material adicionado com sucesso!"))
      .catch(error => {
        console.error("Erro ao adicionar material:", error);
        throw error;
      })
  },

  deleteMaterial: (id: number): Promise<void> => {
    return useApi.delete(`DeletarMaterial?id=${id}`)
      .then(() => console.log("Material excluído com sucesso!"))
      .catch(error => {
        console.error("Erro ao excluir material:", error);
        throw error;
      })
  },

  getAll: async () => {
    let result = await useApi.get("/recuperaMateriais")
    return result.data
  }

}








