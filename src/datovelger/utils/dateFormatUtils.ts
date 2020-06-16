import moment from 'moment';
import { InputDateString, INVALID_DATE, ISODateString } from '../types';

export const INVALID_DATE_VALUE = 'Invalid date';
export const INPUT_DATE_STRING_FORMAT: InputDateString = 'DD.MM.YYYY';
const ALLOWED_INPUT_FORMATS = [INPUT_DATE_STRING_FORMAT, 'DDMMYYYY', 'DD/MM/YYYY', 'DD-MM-YYYY', 'DDMMYY', 'D.M.YY'];
export const ISO_DATE_STRING_FORMAT: ISODateString = moment.HTML5_FMT.DATE;

const stringToUTCDate = (dateString: string | undefined, format: string): Date | undefined => {
    if (dateString !== undefined && dateString.trim().length === 10) {
        const d = moment.utc(dateString, format, true);
        return d.isValid() ? d.toDate() : undefined;
    }
    return undefined;
};

export const dateToInputDateString = (date?: Date): InputDateString | INVALID_DATE =>
    date ? moment.utc(date).format(INPUT_DATE_STRING_FORMAT) : INVALID_DATE_VALUE;

export const dateToISODateString = (date: Date): ISODateString | INVALID_DATE => {
    const d = moment.utc(date);
    return d.isValid() ? d.format(ISO_DATE_STRING_FORMAT) : d.toString();
};

export const ISODateStringToUTCDate = (isoDateString?: ISODateString): Date | undefined => {
    return stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
};

export const InputDateStringToUTCDate = (inputDateString?: InputDateString): Date | undefined => {
    return stringToUTCDate(inputDateString, INPUT_DATE_STRING_FORMAT);
};

export const ISODateStringToInputDateString = (isoDateString: ISODateString): InputDateString | INVALID_DATE => {
    const date = stringToUTCDate(isoDateString, ISO_DATE_STRING_FORMAT);
    const stringValue = date ? dateToInputDateString(date) : INVALID_DATE_VALUE;
    return stringValue === INVALID_DATE_VALUE ? INVALID_DATE_VALUE : stringValue;
};

export const InputDateStringToISODateString = (inputDateString: InputDateString): string | INVALID_DATE => {
    const date = moment.utc(inputDateString, ALLOWED_INPUT_FORMATS, true);
    return date.isValid() ? dateToISODateString(date.toDate()) : INVALID_DATE_VALUE;
};
