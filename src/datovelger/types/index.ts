export interface Tidsperiode {
    fom: string;
    tom: string;
}

export interface DatovelgerAvgrensninger {
    minDato?: string;
    maksDato?: string;
    ugyldigeTidsperioder?: Tidsperiode[];
    helgedagerIkkeTillatt?: boolean;
}

export type KalenderPlassering = 'under' | 'fullskjerm' | '';
