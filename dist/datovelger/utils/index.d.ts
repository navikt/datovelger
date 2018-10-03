import * as moment from 'moment';
import { Avgrensninger } from '../types';
import { Modifier } from 'react-day-picker';
export * from './kalenderFokusUtils';
export declare const isDateObject: (date: any) => any;
export declare const normaliserDato: (d: Date) => moment.Moment;
export declare const formatDateInputValue: (date?: Date) => string;
export declare const formaterDayAriaLabel: (dato: Date, locale: string) => string;
export declare const dagDatoNøkkel: (dato: Date) => string;
export declare const getMånedDiff: (måned1: Date, måned2: Date) => number;
export declare const erMånedTilgjengelig: (måned: Date, avgrensninger?: {
    min?: Date;
    maks?: Date;
}) => boolean;
export declare const getUtilgjengeligeDager: (avgrensninger: Avgrensninger) => Modifier[];
export declare const getDefaultMåned: (dato: Date, avgrensninger?: Avgrensninger) => Date;
