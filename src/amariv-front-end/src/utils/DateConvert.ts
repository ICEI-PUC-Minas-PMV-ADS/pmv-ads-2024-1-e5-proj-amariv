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
    return moment.utc(date).local().format('YYYY-MM-DDTHH:mm');
  }

  static getLocalHour(date: string | Date): string {
    return moment.utc(date).local().format('HH:mm');
  }

  static getLocalDate(date: string | Date): string {
    return moment.utc(date).local().format('YYYY-MM-DD');
  }
}