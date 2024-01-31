import moment from 'moment';
import { FilterContextState } from './type';

const DATE_FORMAT = 'DD-MM-YYYY';
const SIGN_ASTERISK = '*';

export const formatDateToQueryParams = (
  value?: FilterContextState['dateRange']
): string => {
  if (!value) return '';
  if (value.to) {
    return `${moment(value.from).format(DATE_FORMAT)}${SIGN_ASTERISK}${moment(
      value.to
    ).format(DATE_FORMAT)}`;
  } else {
    return moment(value.from).format(DATE_FORMAT);
  }
};

export const getDateRangeFromQueryParams = (
  dateQuery: string
): { from: Date; to?: Date } => {
  const isAsterisk = dateQuery.includes(SIGN_ASTERISK);
  if (!isAsterisk) {
    const from = moment(dateQuery, DATE_FORMAT).toDate();
    return { from };
  }
  const [from, to] = dateQuery
    .split(SIGN_ASTERISK)
    .map((date) => moment(date, DATE_FORMAT).toDate());
  return { from, to };
};
