/**
 * RoteiroDeColetaUtils
 */

export class RoteiroDeColetaUtils {
  static formatDate(dataRoteiro: string | undefined): string {
    try {
      if (dataRoteiro) {
        const date = new Date(dataRoteiro);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      }
    } catch (e) {
      console.log(e);
    }
    return "";
  }
}