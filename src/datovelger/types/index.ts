/** YYYY-MM-DD */
export type ISODateString = string;

/** DD-MM-YYYY */
export type InputDateString = string;

/** Used when input date is invalid  */
export type INVALID_DATE = 'Invalid date';

export interface Tidsperiode {
    fom: ISODateString;
    tom: ISODateString;
}

export interface DatovelgerAvgrensninger {
    minDato?: ISODateString;
    maksDato?: ISODateString;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}

export type KalenderPlassering = 'under' | 'fullskjerm' | '';
