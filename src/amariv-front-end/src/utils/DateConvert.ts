import moment from "moment";

/**
 * DateConvert
 */

export class DateConvert {
  static getIsoDateTime(date: string | Date): string {
    return moment.utc(date).local().format('YYYY-MM-DDTHH:mm');
  }

  static getIsoHour(date: string | Date): string {
    return moment.utc(date).local().format('HH:mm');
  }

  static getIsoDate(date: string | Date): string {
    return moment.utc(date).local().format('YYYY-MM-DD');
  }

  static getLocalDateTime(date: string | Date): string {
    return moment.utc(date).local().format('DD/MM/YYYYTHH:mm');
  }

  static getLocalHour(date: string | Date): string {
    return moment.utc(date).local().format('HH:mm');
  }

  static getLocalDate(date: string | Date): string {
    return moment.utc(date).local().format('DD/MM/YYYY');
  }

  static getUTCDateObject(date: string | Date): Date {
    const [y, m, d] = moment.utc(date).local().format('YYYY-MM-DD').split('-');
    const outDT = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 0, 0, 0);
    return outDT;
  }

  static getLocalDateObject(date: string | Date): Date {
    const [y, m, d] = moment(date).format('YYYY-MM-DD').split('-');
    const outDT = new Date(parseInt(y), parseInt(m) - 1, parseInt(d), 0, 0, 0);
    return outDT;
  }

  static getLocalDateTimeFormatted(date: string | Date): string {
    return moment.utc(date).local().format('DD/MM/YYYY - HH:mm');
  }
}