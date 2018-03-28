import * as moment from 'moment';
export * from './kalenderFokusUtils';
export declare const normaliserDato: (d: Date) => moment.Moment;
export declare const formatDateInputValue: (date?: Date | undefined) => string;
export declare const formaterDayAriaLabel: (dato: Date, locale: string) => string;
export declare const dagDatoNøkkel: (dato: Date) => string;
export declare const getMånedDiff: (måned1: Date, måned2: Date) => number;
export declare const erMånedTilgjengelig: (måned: Date, avgrensninger?: {
    min?: Date | undefined;
    maks?: Date | undefined;
} | undefined) => boolean;
