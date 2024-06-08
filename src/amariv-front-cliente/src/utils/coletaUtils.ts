import { Material } from "../types/Material";

export const coletaUtils = {
  stringMateriais: (string: string, listaMateriais: Material[]) => {
    // Dividir a string em pares de "idMaterial:Peso"
    const pares: string[] = string.split(';');

    // Criar um mapa com o idMaterial como chave e o peso como valor
    const pesoPorId: Map<number, string> = new Map();
    pares.forEach(par => {
      const [idMaterial, peso] = par.split(':');
      pesoPorId.set(parseInt(idMaterial), peso);
    });

    // Montar a string final
    const resultado: string[] = [];
    listaMateriais.forEach(material => {
      const peso = pesoPorId.get(material.id);
      if (peso) {
        resultado.push(`${material.descricao} (${peso})`);
      }
    });

    return resultado.join(', ');
  }
}