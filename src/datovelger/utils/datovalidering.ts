import { Avgrensninger, Tidsperiode } from '../types';
import * as moment from 'moment';
import { Moment } from 'moment';

export const erDatoGyldig = (
	dato: string| undefined,
	avgrensninger?: Avgrensninger
): boolean => {
	const d = moment(dato, moment.HTML5_FMT.DATE, true);
	return avgrensninger === undefined ? d.isValid() : d.isValid() && erDatoUtenforAvgrensninger(d, avgrensninger)
};

const erDatoUtenforAvgrensninger = (dato: Moment, avgrensninger: Avgrensninger) => {
	if(avgrensninger.minDato) {
		return dato.isSameOrAfter(moment(avgrensninger.minDato, moment.HTML5_FMT.DATE), 'day');
	}

	if(avgrensninger.maksDato) {
		return dato.isSameOrBefore(moment(avgrensninger.maksDato, moment.HTML5_FMT.DATE), 'day');
	}

	if(avgrensninger.helgedagerIkkeTillatt) {
		return dato.isoWeekday() <= 5;
	}

	if(avgrensninger.ugyldigeTidsperioder) {
		return !erDatoIEnUgyldigTidsperiode(dato, avgrensninger.ugyldigeTidsperioder);
	}
	return true;
}

export const erDatoIEnUgyldigTidsperiode = (dato: Moment, ugyldigeTidsperioder: Tidsperiode[]): boolean => {
		return ugyldigeTidsperioder.some((t: Tidsperiode) => {
			const fom  =  moment(t.fom, moment.HTML5_FMT.DATE);
			const tom  =  moment(t.tom, moment.HTML5_FMT.DATE);
			return dato.isBetween(fom, tom, 'day', "[]");
		})
};
