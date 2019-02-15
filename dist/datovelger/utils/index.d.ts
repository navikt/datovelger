import { Avgrensninger } from '../types';
import { Modifier, DayPickerProps } from 'react-day-picker';
export * from './kalenderFokusUtils';
export declare const formatDateInputValue: (dato: string) => string;
export declare const formatInputToISODateFormatStrig: (input: string) => string;
export declare const dagDatoNøkkel: (dato: Date) => string;
export declare const getMånedDiff: (måned1: Date, måned2: Date) => number;
export declare const erMånedTilgjengelig: (måned: Date, avgrensninger?: {
    min?: string;
    maks?: string;
}) => boolean;
export declare const getUtilgjengeligeDager: (avgrensninger: Avgrensninger) => Modifier[];
export declare const getDefaultMåned: (dato: string, avgrensninger: Avgrensninger, dayPickerProps: DayPickerProps) => Date;
