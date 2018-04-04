import { Avgrensninger, Tidsperiode } from '../types';
export declare type DatoValidering = 'datoErIkkeDefinert' | 'datoErUgyldig' | 'datoErFørMinDato' | 'datoErEtterMaksDato' | 'datoErIkkeUkedag' | 'datoErIUgyldigPeriode' | 'gyldig';
export declare const erDatoGyldig: (dato: string | Date | null | undefined, avgrensninger: Avgrensninger) => boolean;
export declare const validerDato: (dato: string | Date | null | undefined, avgrensninger: Avgrensninger) => DatoValidering;
export declare const erDatoDefinert: (dato: Date) => boolean;
export declare const erDatoEnDato: (dato: Date) => boolean;
export declare const erDatoEtterMinDato: (dato: Date, minDato?: Date | undefined) => boolean;
export declare const erDatoFørSluttdato: (dato: Date, maksDato?: Date | undefined) => boolean;
export declare const erDatoUkedag: (dato: Date) => boolean;
export declare const erDatoITidsperioder: (dato: Date, tidsperioder?: Tidsperiode[] | undefined) => boolean;
export declare const erDagTilgjengelig: (dato: Date, avgrensninger?: Avgrensninger | undefined) => true | "datoErIkkeDefinert" | "datoErUgyldig" | "datoErFørMinDato" | "datoErEtterMaksDato" | "datoErIkkeUkedag" | "datoErIUgyldigPeriode" | "gyldig";
