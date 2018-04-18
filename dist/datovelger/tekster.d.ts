export declare const Tekster: {
    kalenderLabel: string;
    navbar_nesteManed_label: string;
    navbar_forrigeManed_label: string;
    avgrensninger: {
        måVæreMellom: (fraDato: string, tilDato: string) => string;
        fra: (dato: string) => string;
        til: (dato: string) => string;
        helg: string;
    };
};
