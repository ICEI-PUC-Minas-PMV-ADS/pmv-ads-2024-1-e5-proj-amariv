import { Material } from "../types/Material";

export const coletaUtils = {
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
  }
}