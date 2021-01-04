/** YYYY-MM-DD */
export type ISODateString = string;

/** DD-MM-YYYY */
export type InputDateString = string;

/** Type used when input date is invalid  */
export type INVALID_DATE_TYPE = 'Invalid date';

export interface DatepickerDateRange {
    from: ISODateString;
    to: ISODateString;
}

export interface DatepickerLimitations {
    minDate?: ISODateString;
    maxDate?: ISODateString;
    invalidDateRanges?: DatepickerDateRange[];
    weekendsNotSelectable?: boolean;
}

export type DatepickerLocales = 'nb' | 'nn' | 'en';

export type CalendarPlacement = 'under' | 'fullscreen' | '' | 'responsive';
