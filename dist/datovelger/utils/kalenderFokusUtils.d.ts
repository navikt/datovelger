export declare const getFokusertDato: (kalender: HTMLElement | null) => Date | undefined;
export declare const getSammeDatoIMåned: (dato: Date, måned: Date, nesteMåned: Date) => Date;
export declare const fokuserPåDato: (kalender: HTMLElement | null, dato: Date) => void;
export declare const fokuserFørsteDagIUke: (kalender: HTMLElement | null, dato: Date, evt: KeyboardEvent) => void;
export declare const fokuserFørsteDagIMåned: (kalender: HTMLElement | null, måned: Date, evt: KeyboardEvent) => void;
export declare const fokuserSisteDagIMåned: (kalender: HTMLElement | null, måned: Date, evt: KeyboardEvent) => void;
export declare const fokuserSisteDagIUke: (kalender: HTMLElement | null, dato: Date, evt: KeyboardEvent) => void;
export declare const fokuserKalender: (kalender: HTMLElement | null) => void;
