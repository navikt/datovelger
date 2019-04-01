import { MånedFokusElement } from '../kalender/Kalender';
export declare const getFokusertDato: (kalender: HTMLElement) => Date;
export declare const getSammeDatoIMåned: (dato: Date, måned: Date, nesteMåned: Date) => Date;
export declare const fokuserPåDato: (kalender: HTMLElement, dato: Date) => void;
export declare const fokuserPåMåned: (kalender: HTMLElement, fokusElement: MånedFokusElement) => void;
export declare const fokuserKalender: (kalender: HTMLElement) => void;
