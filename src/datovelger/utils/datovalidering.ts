import moment, { Moment } from 'moment';
import { DatovelgerAvgrensninger, Tidsperiode } from '../types';

export const erDatoIEnUgyldigTidsperiode = (dato: Moment, ugyldigeTidsperioder: Tidsperiode[]): boolean => {
    return ugyldigeTidsperioder.some((t: Tidsperiode) => {
        const fom = moment(t.fom, moment.HTML5_FMT.DATE);
        const tom = moment(t.tom, moment.HTML5_FMT.DATE);
        return dato.isBetween(fom, tom, 'day', '[]');
    });
};

const erDatoUtenforAvgrensninger = (dato: Moment, avgrensninger: DatovelgerAvgrensninger) => {
    if (avgrensninger.minDato) {
        return dato.isSameOrAfter(moment(avgrensninger.minDato, moment.HTML5_FMT.DATE), 'day');
    }

    if (avgrensninger.maksDato) {
        return dato.isSameOrBefore(moment(avgrensninger.maksDato, moment.HTML5_FMT.DATE), 'day');
    }

    if (avgrensninger.helgedagerIkkeTillatt) {
        return dato.isoWeekday() <= 5;
    }

    if (avgrensninger.ugyldigeTidsperioder) {
        return !erDatoIEnUgyldigTidsperiode(dato, avgrensninger.ugyldigeTidsperioder);
    }
    return true;
};

export const erDatoGyldig = (dato: string | undefined, avgrensninger?: DatovelgerAvgrensninger): boolean => {
    const d = moment(dato, moment.HTML5_FMT.DATE, true);
    return avgrensninger === undefined ? d.isValid() : d.isValid() && erDatoUtenforAvgrensninger(d, avgrensninger);
};
