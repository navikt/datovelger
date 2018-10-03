export declare const getFokusertDato: (kalender: HTMLElement) => Date;
export declare const getSammeDatoIMåned: (dato: Date, måned: Date, nesteMåned: Date) => Date;
export declare const fokuserPåDato: (kalender: HTMLElement, dato: Date) => void;
export declare const fokuserFørsteDagIUke: (kalender: HTMLElement, dato: Date, evt: KeyboardEvent) => void;
export declare const fokuserFørsteDagIMåned: (kalender: HTMLElement, måned: Date, evt: KeyboardEvent) => void;
export declare const fokuserSisteDagIMåned: (kalender: HTMLElement, måned: Date, evt: KeyboardEvent) => void;
export declare const fokuserSisteDagIUke: (kalender: HTMLElement, dato: Date, evt: KeyboardEvent) => void;
export declare const fokuserKalender: (kalender: HTMLElement) => void;
