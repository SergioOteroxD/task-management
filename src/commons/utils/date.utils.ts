// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment-timezone');
import { DurationInputArg2, unitOfTime } from 'moment';

/**
 * Módulo con utilidades generales
 */
export class DateUtils {
  public static isFormatDateValid(date: string, format: string): boolean {
    return moment(date, format, true).isValid();
  }

  /**
   *
   * @param options
   * @returns
   */
  public static getDate(
    options: {
      format?:
        | 'YYYY-MM-DD'
        | 'YYYY-MM-DDTHH:mm'
        | 'YYYY-MM-DDTHH:mm:ss'
        | string;
      date?: string;
      unit?: DurationInputArg2;
      amount?: number;
      tz?: string;
    } = {
      date: moment(),
      unit: 'days',
      amount: 0,
      tz: process.env.TZ,
    },
  ): string {
    return moment(options?.date ?? moment().format())
      .add(options?.amount ?? 0, options?.unit ?? 'days')
      .tz(options?.tz ?? process.env.TZ ?? 'America/Bogota')
      .format(options?.format);
  }

  /**
   *
   * @param finalDate
   * @param initialDate
   * @param unitOfTime
   * @param precise
   * @returns
   */
  public static getDiff(
    finalDate: string,
    initialDate?: string,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    unitOfTime: unitOfTime.Diff = 'hours',
    precise: boolean = true,
  ): number {
    const _initialDate = moment(initialDate);
    const _finalDate = moment(finalDate);

    return _finalDate.diff(_initialDate, unitOfTime, precise);
  }

  /**
   *
   * @param date
   * @returns
   */
  public static getDateTZ(date: string): any {
    if (!date) {
      return;
    }
    return DateUtils.getDate({
      date,
    });
  }
}
