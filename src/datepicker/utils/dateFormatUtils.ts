import moment from 'moment';
import { InputDateString, INVALID_DATE_TYPE, ISODateString } from '../types';

export const INVALID_DATE_VALUE = 'Invalid date';
export const INPUT_DATE_STRING_FORMAT: InputDateString = 'DD.MM.YYYY';
export const ISO_DATE_STRING_FORMAT: ISODateString = moment.HTML5_FMT.DATE;

moment.parseTwoDigitYear = function (yearString) {
    const yearBreakpoint = new Date().getFullYear() / 100 + 20;
    return parseInt(yearString) + (parseInt(yearString) > yearBreakpoint ? 1900 : 2000);
};

const ALLOWED_INPUT_FORMATS = [INPUT_DATE_STRING_FORMAT, 'DDMMYYYY', 'DD/MM/YYYY', 'DD-MM-YYYY', 'DDMMYY', 'D.M.YY'];

const stringToUTCDate = (dateString: string | undefined, format: string): Date | undefined => {
    if (dateString !== undefined && dateString.trim && dateString.trim().length === 10) {
        const d = moment.utc(dateString, format, true);
        return d.isValid() ? d.toDate() : undefined;
    }
    return undefined;
};

export const dateToInputDateString = (date?: Date): InputDateString | INVALID_DATE_TYPE =>
    date ? moment.utc(date).format(INPUT_DATE_STRING_FORMAT) : INVALID_DATE_VALUE;

export const dateToISODateString = (date: Date): ISODateString | INVALID_DATE_TYPE => {
    const d = moment.utc(date);
    return d.isValid() ? d.format(ISO_DATE_STRING_FORMAT) : d.toString();
};

export const ISODateStringToUTCDate = (isoDateString?: ISODateString): Date | undefined => {
    return stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
};

export const InputDateStringToUTCDate = (inputDateString?: InputDateString): Date | undefined => {
    return stringToUTCDate(inputDateString, INPUT_DATE_STRING_FORMAT);
};

export const ISODateStringToInputDateString = (isoDateString: ISODateString): InputDateString | INVALID_DATE_TYPE => {
    const date = stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
    const stringValue = date ? dateToInputDateString(date) : INVALID_DATE_VALUE;
    return stringValue === INVALID_DATE_VALUE ? INVALID_DATE_VALUE : stringValue;
};

export const InputDateStringToISODateString = (inputDateString: InputDateString): string | INVALID_DATE_TYPE => {
    const date = moment.utc(inputDateString, ALLOWED_INPUT_FORMATS, true);
    return date.isValid() ? dateToISODateString(date.toDate()) : INVALID_DATE_VALUE;
};
