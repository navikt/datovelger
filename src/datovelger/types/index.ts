/** YYYY-MM-DD */
export type ISODateString = string;

/** DD-MM-YYYY */
export type InputDateString = string;

/** Type used when input date is invalid  */
export type INVALID_DATE_TYPE = 'Invalid date';

export interface Tidsperiode {
    fom: ISODateString;
    tom: ISODateString;
}

export interface DatepickerLimitations {
    minDate?: ISODateString;
    maxDate?: ISODateString;
    invalidDateRanges?: Tidsperiode[];
    weekendsNotSelectable?: boolean;
}

export type CalendarPlacement = 'under' | 'fullskjerm' | '' | 'responsive';
